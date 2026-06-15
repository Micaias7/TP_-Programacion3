import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "./conexion.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function crearTablaMigraciones() {
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS migraciones_ejecutadas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL UNIQUE,
                ejecutada_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
    const connection = await pool.getConnection();
    await connection.execute(query);
    connection.release();
    console.log("✓ Tabla de migraciones verificada");
  } catch (error) {
    console.error("Error al crear tabla de migraciones:", error.message);
    throw error;
  }
}

async function obtenerMigracionesEjecutadas() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT nombre FROM migraciones_ejecutadas",
    );
    connection.release();
    return rows.map((row) => row.nombre);
  } catch (error) {
    console.error("Error al obtener migraciones ejecutadas:", error.message);
    return [];
  }
}

async function registrarMigracion(nombre) {
  try {
    const connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO migraciones_ejecutadas (nombre) VALUES (?)",
      [nombre],
    );
    connection.release();
  } catch (error) {
    console.error(`Error al registrar migración ${nombre}:`, error.message);
    throw error;
  }
}

async function ejecutarScript(rutaScript, nombreMigracion) {
  try {
    const contenidoSQL = fs.readFileSync(rutaScript, "utf-8");
    const connection = await pool.getConnection();

    const statements = contenidoSQL
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    for (const statement of statements) {
      try {
        await connection.execute(statement);
      } catch (statementError) {
        // Ignorar errores de columna o tabla que ya existen
        if (
          statementError.code === "ER_DUP_FIELDNAME" ||
          statementError.message.includes("Duplicate column") ||
          statementError.code === "ER_TABLE_EXISTS_ERROR" ||
          statementError.message.includes("already exists")
        ) {
          console.log(
            `  Campo/tabla ya existe: ${statementError.message.split("\n")[0]}`,
          );
          continue;
        }
        // Relanzar otros errores
        throw statementError;
      }
    }

    connection.release();
    await registrarMigracion(nombreMigracion);
    console.log(`Migración ejecutada: ${nombreMigracion}`);
    return true;
  } catch (error) {
    console.error(
      `Error al ejecutar migración ${nombreMigracion}:`,
      error.message,
    );
    throw error;
  }
}

export async function ejecutarMigraciones() {
  try {
    console.log("\nIniciando proceso de migraciones...");
    await crearTablaMigraciones();

    const migrationesEjecutadas = await obtenerMigracionesEjecutadas();
    const carpetaScripts = path.join(__dirname, "../../scripts");

    if (!fs.existsSync(carpetaScripts)) {
      console.log("Carpeta de scripts no encontrada");
      return;
    }

    const archivos = fs
      .readdirSync(carpetaScripts)
      .filter((archivo) => archivo.endsWith(".sql"))
      .sort();

    if (archivos.length === 0) {
      console.log("No hay scripts SQL para ejecutar");
      return;
    }

    let ejecutadas = 0;
    for (const archivo of archivos) {
      const nombreMigracion = archivo;

      if (migrationesEjecutadas.includes(nombreMigracion)) {
        console.log(`Ya ejecutada: ${nombreMigracion}`);
        continue;
      }

      const rutaScript = path.join(carpetaScripts, archivo);
      await ejecutarScript(rutaScript, nombreMigracion);
      ejecutadas++;
    }

    if (ejecutadas === 0) {
      console.log("Todas las migraciones ya han sido ejecutadas");
    } else {
      console.log(`Se ejecutaron ${ejecutadas} migración(es) nueva(s)`);
    }

    console.log("Proceso de migraciones finalizado\n");
  } catch (error) {
    console.error("Error fatal en el proceso de migraciones:", error);
    throw error;
  }
}

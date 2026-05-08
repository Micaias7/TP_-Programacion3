import { pool } from "./conexion.js";

export default class ObrasSociales {
  crearObraSocial = async (nombre) => {
    const sql = "INSERT INTO obras_sociales (nombre) VALUES (?)";
    const [result] = await pool.execute(sql, [nombre]);
    return result;
  };

  desactivarObraSocial = async (id) => {
    const sql = "UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?";
    const [result] = await pool.execute(sql, [id]);
    return result;
  };
}

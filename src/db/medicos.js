<<<<<<< HEAD
import {pool} from "./conexion.js" ; 

export default class Medicos {
    
    buscarTodos = async () => {
        
        const sql = 'SELECT * from medicos ' ;
        const [medicos] = await pool.query (sql);
        
        return medicos ;
    };

    buscarPorId = async (id_medico) => {
        const sql = 'SELECT * from medicos WHERE  id_medico = ? ' ;
        const [medicos] = await pool.execute (sql, [id_medico]);
        return medicos ;
    };

    crearMedico = async (
    id_usuario,
    id_especialidad,
    matricula,
    descripcion,
    valor_consulta
) => {
    const sql = `
        INSERT INTO medicos
        (id_usuario, id_especialidad, matricula, descripcion, valor_consulta)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta
    ]);

    return result;
};

        

    editarMedico = async (
    id_medico,
    id_usuario,
    id_especialidad,
    matricula,
    descripcion,
    valor_consulta
) => {

    const sql = `
        UPDATE medicos
        SET id_usuario = ?,
            id_especialidad = ?,
            matricula = ?,
            descripcion = ?,
            valor_consulta = ?
        WHERE id_medico = ?
    `;

    const [result] = await pool.execute(sql, [
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta,
        id_medico
    ]);

    return result;
};


    eliminarMedico = async (id_medico) => {
    const sql = 'DELETE FROM medicos WHERE id_medico = ?';
    const [result] = await pool.execute(sql, [id_medico]);
    return result;
};



};
=======
import { pool } from "./conexion.js";

export default class Medicos {
  buscarTodos = async () => {
    const sql = "SELECT * FROM v_medicos";
    const [medicos] = await pool.execute(sql);
    return medicos;
  };

  buscarPorId = async (id_medico) => {
    const sql = `SELECT * FROM medicos WHERE id_medico = ?`;
    const [medico] = await pool.execute(sql, [id_medico]);
    return medico[0];
  };

  relacionarConObraSocial = async (id_medico, obras_sociales) => {
    const conexion = await pool.getConnection();

    try {
      await conexion.beginTransaction();

      for (const os of obras_sociales) {
        const sql = `INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?,?);`;
        await conexion.execute(sql, [id_medico, os.id_obra_social]);
      };

      await conexion.commit();
      await conexion.release();

      return true;
    } catch (error) {
      await conexion.rollback();
      await conexion.release();
      return false;
    };
  };

  buscarObrasSocialesDeMedico = async (id_medico) => {
    const sql = `
      SELECT id_obra_social
      FROM medicos_obras_sociales
      WHERE id_medico = ?
    `;

    const [rows] = await pool.execute(sql, [id_medico]);

    return rows;
  };
};
>>>>>>> 7bad32091e10428bc81c2da71e71379be0c6fb1a

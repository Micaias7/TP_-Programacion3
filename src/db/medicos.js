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

  buscarPorEspecialidad = async (id_especialidad) => {
    const sql = `SELECT u.apellido, u.nombres, u.email, u.foto_path
                  FROM medicos AS m
                  INNER JOIN usuarios AS u ON u.id_usuario = m.id_usuario
                  WHERE m.id_especialidad = ?`;
    const [medicos] = await pool.execute(sql, [id_especialidad]);
    return medicos;
  };

  asociarEspecialidad = async (id_medico, id_especialidad) => {
    const sql = "UPDATE medicos SET id_especialidad =? WHERE id_medico =?";
    const [result] = await pool.execute(sql, [id_especialidad, id_medico]);
    return result;
  };

  relacionarConObraSocial = async (id_medico, obras_sociales) => {
    const conexion = await pool.getConnection();

    try {
      await conexion.beginTransaction();

      for (const os of obras_sociales) {
        const sql = `INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?,?);`;
        await conexion.execute(sql, [id_medico, os.id_obra_social]);
      }

      await conexion.commit();
      await conexion.release();

      return true;
    } catch (error) {
      await conexion.rollback();
      await conexion.release();
      return false;
    }
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

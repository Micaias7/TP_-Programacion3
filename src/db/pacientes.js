import { pool } from "./conexion.js";

export default class Pacientes {
  buscarPorId = async (id_paciente) => {
    const sql = `SELECT * FROM pacientes WHERE id_paciente = ?`;
    const [paciente] = await pool.execute(sql, [id_paciente]);
    return paciente[0];
  };

  buscarPorUsuario = async (id_usuario) => {
    const sql = `
        SELECT *
        FROM pacientes
        WHERE id_usuario = ?
    `;

    const [pacientes] = await pool.execute(sql, [id_usuario]);

    return pacientes[0];
  };
};

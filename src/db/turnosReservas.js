import { pool } from "./conexion.js";

export default class TurnosReservas {
  crear = async (turnoReserva) => {
    const { id_medico, id_paciente, id_obra_social, fecha_hora, valor_total } =
      turnoReserva;
    const sql = `INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total)
             VALUES (?,?,?,?,?)`;
    const [result] = await pool.execute(sql, [
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total,
    ]);
    if (result.affectedRows === 0) {
      return null;
    }
    return result.insertId;
  };

  turnosDeUnMedico = async (id_usuario) => {
    const sql = `SELECT tr.fecha_hora, up.documento, up.nombres, up.apellido, tr.valor_total
                    FROM usuarios AS um
                    INNER JOIN medicos AS m ON m.id_usuario = um.id_usuario
                    INNER JOIN turnos_reservas AS tr ON tr.id_medico = m.id_medico
                    INNER JOIN pacientes AS p ON p.id_paciente = tr.id_paciente
                    INNER JOIN usuarios AS up ON up.id_usuario = p.id_usuario
                    WHERE um.id_usuario = ?;`;
    const [turnos] = await pool.execute(sql, [id_usuario]);
    return turnos;
  };

  turnosDeUnPaciente = async (id_usuario) => {
    const sql = `SELECT tr.fecha_hora, tr.valor_total
                        FROM usuarios as u
                        INNER JOIN pacientes AS p ON p.id_usuario = u.id_usuario
                        INNER JOIN turnos_reservas AS tr ON tr.id_paciente = p.id_paciente
                        WHERE u.id_usuario = ?`;
    const [turnos] = await pool.execute(sql, [id_usuario]);
    return turnos;
  };
};

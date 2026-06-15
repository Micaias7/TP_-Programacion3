import { pool } from "./conexion.js";

export default class TurnosReservas {
  crearTurno = async (turnoReserva) => {
    const {
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total,
      observaciones,
    } = turnoReserva;
    const sql = `INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, observaciones)
             VALUES (?,?,?,?,?,?)`;
    const [result] = await pool.execute(sql, [
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total,
      observaciones || null,
    ]);
    if (result.affectedRows === 0) {
      return null;
    }
    return result.insertId;
  };

  turnosDeUnMedico = async (id_usuario) => {
    const sql = `SELECT tr.id_turno_reserva,
                        tr.fecha_hora,
                        tr.valor_total,
                        tr.observaciones,
                        tr.atentido,
                        tr.activo,
                        p.id_paciente,
                        up.documento AS paciente_documento,
                        up.nombres AS paciente_nombres,
                        up.apellido AS paciente_apellido,
                        up.email AS paciente_email,
                        e.id_especialidad,
                        e.nombre AS especialidad
                    FROM usuarios AS um
                    INNER JOIN medicos AS m ON m.id_usuario = um.id_usuario
                    INNER JOIN turnos_reservas AS tr ON tr.id_medico = m.id_medico
                    INNER JOIN pacientes AS p ON p.id_paciente = tr.id_paciente
                    INNER JOIN usuarios AS up ON up.id_usuario = p.id_usuario
                    INNER JOIN especialidades AS e ON e.id_especialidad = m.id_especialidad
                    WHERE um.id_usuario = ?;`;
    const [turnos] = await pool.execute(sql, [id_usuario]);
    return turnos;
  };

  turnosDeUnPaciente = async (id_usuario) => {
    const sql = `SELECT tr.id_turno_reserva,
                        tr.fecha_hora,
                        tr.valor_total,
                        tr.observaciones,
                        tr.atentido,
                        tr.activo,
                        m.id_medico,
                        um.documento AS medico_documento,
                        um.nombres AS medico_nombres,
                        um.apellido AS medico_apellido,
                        um.email AS medico_email,
                        e.id_especialidad,
                        e.nombre AS especialidad
                        FROM usuarios as u
                        INNER JOIN pacientes AS p ON p.id_usuario = u.id_usuario
                        INNER JOIN turnos_reservas AS tr ON tr.id_paciente = p.id_paciente
                        INNER JOIN medicos AS m ON m.id_medico = tr.id_medico
                        INNER JOIN usuarios AS um ON um.id_usuario = m.id_usuario
                        INNER JOIN especialidades AS e ON e.id_especialidad = m.id_especialidad
                        WHERE u.id_usuario = ?`;
    const [turnos] = await pool.execute(sql, [id_usuario]);
    return turnos;
  };
  buscarPorId = async (id_turno_reserva) => {
    const sql = `SELECT * FROM turnos_reservas WHERE activo = 1 AND id_turno_reserva = ?`;
    const [rows] = await pool.execute(sql, [id_turno_reserva]);
    return rows;
  };

  desactivarTurno = async (id_turno_reserva) => {
    const sql = `UPDATE turnos_reservas SET activo = 0 WHERE activo = 1 AND id_turno_reserva = ?`;
    const [result] = await pool.execute(sql, [id_turno_reserva]);
    return result;
  };

  modificarFecha = async (id_turno_reserva, fecha_hora) => {
    const sql = `UPDATE turnos_reservas SET fecha_hora = ? WHERE activo = 1 AND id_turno_reserva = ?`;
    const [result] = await pool.execute(sql, [fecha_hora, id_turno_reserva]);
    return result;
  };

  marcarAtendido = async (id_turno_reserva, id_usuario) => {
    const sql = `UPDATE turnos_reservas tr
                 INNER JOIN medicos m ON m.id_medico = tr.id_medico
                 SET tr.atentido = 1, tr.activo = 0, tr.fecha_atendido = NOW()
                 WHERE tr.id_turno_reserva = ? AND m.id_usuario = ? AND tr.activo = 1`;
    const [result] = await pool.execute(sql, [id_turno_reserva, id_usuario]);
    return result;
  };

  actualizarObservaciones = async (
    id_turno_reserva,
    id_usuario,
    observaciones,
  ) => {
    const sql = `UPDATE turnos_reservas tr
                 INNER JOIN medicos m ON m.id_medico = tr.id_medico
                 SET tr.observaciones = ?
                 WHERE tr.id_turno_reserva = ? AND m.id_usuario = ?`;
    const [result] = await pool.execute(sql, [
      observaciones,
      id_turno_reserva,
      id_usuario,
    ]);
    return result;
  };
}

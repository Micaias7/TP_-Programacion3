import TurnosReservasServicios from "../servicios/turnosReservasServicio.js";

export default class TurnosReservasControlador {
  constructor() {
    this.turnosReservas = new TurnosReservasServicios();
  }

  crear = async (req, res) => {
    try {
      const { id_medico, id_paciente, fecha_hora } = req.body;
      const turnoReserva = { id_medico, id_paciente, fecha_hora };

      const nuevoTurnoReserva = await this.turnosReservas.crear(turnoReserva);

      if (!nuevoTurnoReserva || nuevoTurnoReserva.length === 0) {
        return res.status(400).json({
          estado: false,
          mensaje: "No se pudo crear el turno.",
        });
      }

      return res.status(201).json({
        estado: true,
        mensaje: "Turno Creado.",
        datos: nuevoTurnoReserva,
      });
    } catch (error) {
      console.log(`Error en POST /turnos-reservas ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: "Error interno.",
      });
    }
  };

  buscarTodos = async (req, res) => {
    try {
      const turnos = await this.turnosReservas.buscarTodas(req.user);

      res.status(200).json({
        estado: true,
        mensaje: "Turnos encontrados.",
        turnos: turnos,
      });
    } catch (error) {
      console.log(`Error en GET /turnos ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: "Error interno",
      });
    };
  };

  marcarAtendido = async (req, res) => {
    try {
      const id_turno_reserva = req.params.id_turno_reserva;
      const id_usuario = req.user.id_usuario;

      const result = await this.turnosReservas.marcarAtendido(id_turno_reserva, id_usuario);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          estado: false,
          mensaje: "Turno no encontrado o no pertenece al médico logueado.",
        });
      }

      res.status(200).json({
        estado: true,
        mensaje: "Turno marcado como atendido.",
      });

    } catch (error) {
      console.log(`Error en PUT /turnos-reservas/:id_turno_reserva ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: "Error interno",
      });
    }
  };

}

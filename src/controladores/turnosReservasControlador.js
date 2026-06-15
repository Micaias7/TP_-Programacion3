import TurnosReservasServicios from "../servicios/turnosReservasServicio.js";

export default class TurnosReservasControlador {
  constructor() {
    this.turnosReservas = new TurnosReservasServicios();
  }

  crearTurno = async (req, res) => {
    try {
      const { id_medico, id_paciente, fecha_hora, observaciones } = req.body;
      const turnoReserva = {
        id_medico,
        id_paciente,
        fecha_hora,
        observaciones,
      };

      const nuevoTurnoReserva =
        await this.turnosReservas.crearTurno(turnoReserva);

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
      if (error.status) {
        return res.status(error.status).json({
          estado: false,
          mensaje: error.message,
        });
      }
      res.status(500).json({
        estado: false,
        mensaje: "Error interno.",
      });
    }
  };

  crearTurnoPropio = async (req, res) => {
    try {
      const { id_medico, fecha_hora } = req.body;

      const turnoReserva = {
        id_medico,
        fecha_hora,
        id_usuario: req.user.id_usuario,
      };

      const nuevoTurnoReserva =
        await this.turnosReservas.crearTurnoPropio(turnoReserva);

      return res.status(201).json({
        estado: true,
        mensaje: "Turno creado.",
        datos: nuevoTurnoReserva,
      });
    } catch (error) {
      console.log(`Error en POST /turnos-reservas/mis-turnos ${error}`);
      if (error.status) {
        return res.status(error.status).json({
          estado: false,
          mensaje: error.message,
        });
      }

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
    }
  };

  desactivarTurno = async (req, res) => {
    try {
      const { id } = req.params;

      const resultado = await this.turnosReservas.desactivarTurno(id);

      if (!resultado) {
        return res.status(404).json({
          estado: false,
          mensaje: "Turno no encontrado.",
        });
      }

      return res.status(200).json({
        estado: true,
        mensaje: "Turno desactivado con éxito.",
        id: id,
      });
    } catch (error) {
      console.log(`Error en DELETE /turnos-reservas/:id ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: "Error interno.",
      });
    }
  };

  modificarFecha = async (req, res) => {
    try {
      const { id } = req.params;
      const { fecha_hora } = req.body;

      const resultado = await this.turnosReservas.modificarFecha(
        id,
        fecha_hora,
      );

      if (!resultado) {
        return res.status(404).json({
          estado: false,
          mensaje: "Turno no encontrado.",
        });
      }

      return res.status(200).json({
        estado: true,
        mensaje: "Fecha del turno actualizada con éxito.",
        id: id,
      });
    } catch (error) {
      console.log(`Error en PUT /turnos-reservas/:id ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: "Error interno.",
      });
    }
  };

  marcarAtendido = async (req, res) => {
    try {
      const id_turno_reserva = req.params.id_turno_reserva;
      const id_usuario = req.user.id_usuario;

      const result = await this.turnosReservas.marcarAtendido(
        id_turno_reserva,
        id_usuario,
      );

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
      console.log(
        `Error en PUT /turnos-reservas/medico/:id_turno_reserva ${error}`,
      );
      res.status(500).json({
        estado: false,
        mensaje: "Error interno",
      });
    }
  };

  actualizarObservaciones = async (req, res) => {
    try {
      const id_turno_reserva = req.params.id_turno_reserva;
      const id_usuario = req.user.id_usuario;
      const { observaciones } = req.body;

      const resultado = await this.turnosReservas.actualizarObservaciones(
        id_turno_reserva,
        id_usuario,
        observaciones,
      );

      if (!resultado || resultado.affectedRows === 0) {
        return res.status(404).json({
          estado: false,
          mensaje: "Turno no encontrado o no pertenece al médico logueado.",
        });
      }

      return res.status(200).json({
        estado: true,
        mensaje: "Observaciones actualizadas con éxito.",
        id: id_turno_reserva,
      });
    } catch (error) {
      console.log(
        `Error en PUT /turnos-reservas/medico/:id_turno_reserva/observaciones ${error}`,
      );
      res.status(500).json({
        estado: false,
        mensaje: "Error interno",
      });
    }
  };
}

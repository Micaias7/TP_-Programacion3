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
}

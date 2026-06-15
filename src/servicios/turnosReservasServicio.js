import TurnosReservas from "../db/turnosReservas.js";
import MedicosServicio from "../servicios/medicosServicio.js";
import PacientesServicio from "../servicios/pacientesServicio.js";
import ObrasSocialesServicio from "../servicios/obrasSocialesServicio.js";

export default class TurnosReservasServicio {
  constructor() {
    this.turnosReservas = new TurnosReservas();
    this.medicos = new MedicosServicio();
    this.pacientes = new PacientesServicio();
    this.obrasSociales = new ObrasSocialesServicio();
  }

  buscarTodas = async (usuario) => {
    // SI ES MEDICO
    if (usuario.rol === 1) {
      return this.turnosReservas.turnosDeUnMedico(usuario.id_usuario);
    } else {
      // SI ES PACIENTE
      return this.turnosReservas.turnosDeUnPaciente(usuario.id_usuario);
    }
  };

  buscarPorId = async (id_turno_reserva) => {
    return this.turnosReservas.buscarPorId(id_turno_reserva);
  };

  desactivarTurno = async (id_turno_reserva) => {
    const existe = await this.turnosReservas.buscarPorId(id_turno_reserva);

    if (existe.length === 0) {
      return null;
    }

    return this.turnosReservas.desactivarTurno(id_turno_reserva);
  };

  modificarFecha = async (id_turno_reserva, fecha_hora) => {
    const existe = await this.turnosReservas.buscarPorId(id_turno_reserva);

    if (existe.length === 0) {
      return null;
    }

    return this.turnosReservas.modificarFecha(id_turno_reserva, fecha_hora);
  };

  crear = async (turnoReserva) => {
    const medico = await this.medicos.buscarPorId(turnoReserva.id_medico);

    const paciente = await this.pacientes.buscarPorId(turnoReserva.id_paciente);

    const obra_social = await this.obrasSociales.buscarPorId(
      paciente.id_obra_social,
    );

    let valor = medico.valor_consulta;

    if (obra_social.es_particular === 0) {
      valor = valor - obra_social.porcentaje_descuento * valor;
    }

    turnoReserva.valor_total = valor;
    turnoReserva.id_obra_social = paciente.id_obra_social;

    const id_nuevo = await this.turnosReservas.crear(turnoReserva);
    return id_nuevo;
  };

  marcarAtendido = async (id_turno_reserva, id_usuario) => {
    return await this.turnosReservas.marcarAtendido(id_turno_reserva, id_usuario);
  };

};

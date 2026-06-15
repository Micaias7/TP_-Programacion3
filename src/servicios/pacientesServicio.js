import Pacientes from "../db/pacientes.js";

export default class PacientesServicio {
  constructor() {
    this.pacientes = new Pacientes();
  }

  buscarPorId = (id_paciente) => {
    return this.pacientes.buscarPorId(id_paciente);
  };

  buscarPorUsuario = (id_usuario) => {
  return this.pacientes.buscarPorUsuario(id_usuario);
};

}




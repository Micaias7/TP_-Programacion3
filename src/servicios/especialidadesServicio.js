import Especialidades from "../db/especialidades.js";

export default class EspecialidadesServicio {

  constructor(){
    this.especialidades = new Especialidades();
  };

  buscarTodas = () => {
    return this.especialidades.buscarTodas();
  };

  buscarPorId = (id_especialidad) => {
    return this.especialidades.buscarPorId(id_especialidad);
  };

  crearEspecialidad = (nombre) => {
    return this.especialidades.crearEspecialidad(nombre);
  };

  editarEspecialidad = async (id_especialidad, nombre) => {

    const especialidad = await this.especialidades.buscarPorId(id_especialidad);

    if (especialidad.length === 0) {
      return null;
    };

    return this.especialidades.editarEspecialidad(id_especialidad, nombre);
  };

  eliminarEspecialidad = async (id_especialidad) => {

    const especialidad = await this.especialidades.buscarPorId(id_especialidad);

    if (especialidad.length === 0) {
      return null;
    };

    return this.especialidades.eliminarEspecialidad(id_especialidad);
  };
};
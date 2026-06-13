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

  
  editarEspecialidad = (id_especialidad, nombre) => {
    return this.especialidades.editarEspecialidad(id_especialidad, nombre);
  };

  eliminarEspecialidad = (id_especialidad) => {
    return this.especialidades.eliminarEspecialidad(id_especialidad);
  };

};
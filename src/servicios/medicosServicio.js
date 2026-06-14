import Medicos from "../db/medicos.js";
import EspecialidadesServicio from "./especialidadesServicio.js";

export default class MedicosServicio {
  constructor() {
    this.medicos = new Medicos();
    this.especialidadesServicio = new EspecialidadesServicio();
  };

  buscarPorId = (id_medico) => {
    return this.medicos.buscarPorId(id_medico);
  };

  buscarTodos = async (usuario) => {
    const datos = await this.medicos.buscarTodos();
    if (usuario.rol === 2) {
      const info = datos.map(({ id_medico, id_usuario, ...medico }) => medico);
      return info
    }
    return datos;
  };

  buscarPorEspecialidad = async (id_especialidad) => {
    const datos = await this.medicos.buscarPorEspecialidad(id_especialidad);
    
    return datos;
  };

  asociarEspecialidad = async (id_medico , id_especialidad) =>{
    const datos = await this.especialidadesServicio.buscarPorId(id_especialidad);
    if (datos.length === 0) {
      throw new Error('La especialidad es invalida');
    };

    return this.medicos.asociarEspecialidad(id_medico , id_especialidad);
  };

  asociarMedicoObrasSociales = async (id_medico, obras_sociales) => {

    const ids = obras_sociales.map(os => os.id_obra_social);

    const idsUnicos = new Set(ids);

    if (ids.length !== idsUnicos.size) {
      throw new Error('Hay obras sociales repetidas en la solicitud');
    };

    const relacionesExistentes =  await this.medicos.buscarObrasSocialesDeMedico(id_medico);

    const idsExistentes = new Set(
      relacionesExistentes.map(r => r.id_obra_social)
    );

    for (const os of obras_sociales) {

      if (idsExistentes.has(os.id_obra_social)) {
        throw new Error(
          `La obra social ${os.id_obra_social} ya está asociada al médico`
        );
      };
    };

    return this.medicos.relacionarConObraSocial(id_medico, obras_sociales);
  };
};
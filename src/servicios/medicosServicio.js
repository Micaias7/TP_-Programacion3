import Medicos from "../db/medicos.js";

export default class MedicosServicio {
  constructor() {
    this.medicos = new Medicos();
  };

  buscarPorId = (id_medico) => {
    return this.medicos.buscarPorId(id_medico);
  };

  buscarTodos = async () => {
    const datos = await this.medicos.buscarTodos();
    return datos;
  };

  asociarMedicoObrasSociales = async (id_medico, obras_sociales) => {

    const ids = obras_sociales.map(os => os.id_obra_social);

    const idsUnicos = new Set(ids);

    if (ids.length !== idsUnicos.size) {
      throw new Error('Hay obras sociales repetidas en la solicitud');
    };

    const relacionesExistentes =  await this.medicos.buscarRelaciones(id_medico);

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
import ObrasSociales from "../db/obrasSociales.js";
import PacientesServicio from "./pacientesServicio.js";


export default class ObrasSocialesServicio {

  constructor() {
    this.obrasSociales = new ObrasSociales();
    this.pacientesServicio = new PacientesServicio();
  }

  crearObraSocial = (
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular
  ) => {
    
    porcentaje_descuento = porcentaje_descuento / 100;

    return this.obrasSociales.crearObraSocial(
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular
    );
  };

  desactivarObraSocial = async (id_obra_social) => {
    const existe = await this.obrasSociales.buscarPorId(id_obra_social);

    if (existe.length === 0) {
      return null;
    };
    return this.obrasSociales.desactivarObraSocial(id_obra_social);
  };

  buscarTodas = () => {
    return this.obrasSociales.buscarTodas();
  };

  buscarPorId = (id_obra_social) => {
    return this.obrasSociales.buscarPorId(id_obra_social);
  };

  actualizar = async (
    id_obra_social,
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular,
  ) => {

    const existe = await this.obrasSociales.buscarPorId(id_obra_social);

    if (existe.length === 0) {
      return null;
    };

    porcentaje_descuento = porcentaje_descuento / 100;

    return this.obrasSociales.actualizar(
      id_obra_social,
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular,
    );
  };

  
asociarPaciente = async (id_paciente, id_obra_social) => {

const obraSocial = await this.obrasSociales.buscarPorId(id_obra_social);

  if (obraSocial.length === 0) {
    throw new Error("La obra social es inválida");
  }

  const paciente =
    await this.pacientesServicio.buscarPorId(id_paciente);

  if (!paciente) {
    throw new Error("El paciente es inválido");
  }

  return await this.obrasSociales.asociarPaciente(
    id_paciente,
    id_obra_social
  );
};

};


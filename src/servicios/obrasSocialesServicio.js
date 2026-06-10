import ObrasSociales from "../db/obrasSociales.js";

export default class ObrasSocialesServicio {
  constructor() {
    this.obrasSociales = new ObrasSociales();
  }

  crearObraSocial = (
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular
  ) => {
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

    return this.obrasSociales.actualizar(
      id_obra_social,
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular,
    );
  };
};

import ObrasSociales from "../db/obrasSociales.js";

export default class ObrasSocialesServicio {
  constructor() {
    this.obrasSociales = new ObrasSociales();
  }

  crearObraSocial = (nombre) => {
    return this.obrasSociales.crearObraSocial(nombre);
  };

  desactivarObraSocial = (id_obra_social) => {
    return this.obrasSociales.desactivarObraSocial(id_obra_social);
  };

  buscarTodas = () => {
    return this.obrasSociales.buscarTodas();
  };

  buscarPorId = (id_obra_social) => {
    return this.obrasSociales.buscarPorId(id_obra_social);
  };

  actualizar = (
    id_obra_social,
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular,
  ) => {
    return this.obrasSociales.actualizar(
      id_obra_social,
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular,
    );
  };
}

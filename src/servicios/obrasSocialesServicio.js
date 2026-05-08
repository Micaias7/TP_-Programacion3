import ObrasSociales from "../db/obrasSociales.js";

export default class ObrasSocialesServicio {

  constructor() {
    this.obrasSociales = new ObrasSociales();
  };

  buscarTodas = () => {
    return this.obrasSociales.buscarTodas();
  };

  buscarPorId = (id_obra_social) => {
    return this.obrasSociales.buscarPorId(id_obra_social);
  };

};

import ObrasSocialesServicio from "../servicios/obrasSocialesServicio.js";

export default class ObrasSocialesControlador {

  constructor() {
    this.obrasSociales = new ObrasSocialesServicio();
  };

  buscarTodas = async (req, res) => {

    try {
      const obrasSociales = await this.obrasSociales.buscarTodas();
      res.status(200).json({
        'estado': true,
        'obrasSociales': obrasSociales
      });

    } catch (error) {
      console.log(`Error en GET /obras-sociales ${error}`);
      res.status(500).json({
        'estado': false,
        'msg': 'Error interno'
      });
    };
  };

  buscarPorId = async (req, res) => {

    try {
      const id_obra_social = req.params.id_obra_social;
      const obrasSociales = await this.obrasSociales.buscarPorId(id_obra_social);

      if (obrasSociales.length === 0) {
        return res.status(404).json({
          'estado': false,
          'msg': 'Obra social no encontrada'
        });
      };

      res.status(200).json({
        'estado': true,
        'obraSocial': obrasSociales[0]
      });

    } catch (error) {
      console.log(`Error en GET /obras-sociales/:id_obra_social ${error}`);
      res.status(500).json({
        'estado': false,
        'msg': 'Error interno'
      });
    };
  };

};

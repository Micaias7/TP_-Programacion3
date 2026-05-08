import ObrasSocialesServicio from "../servicios/obrasSocialesServicio.js";

export default class ObrasSocialesControlador {
  constructor() {
    this.obrasSociales = new ObrasSocialesServicio();
  }

  crearObraSocial = async (req, res) => {
    try {
      const { nombre } = req.body;

      const nuevaObraSocial = await this.obrasSociales.crearObraSocial(nombre);

      if (nuevaObraSocial.affectedRows > 0) {
        res.status(201).json({
          estado: true,
          msg: `ID Creado ${nuevaObraSocial.insertId}`,
        });
      }
    } catch (error) {
      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    }
  };

  desactivarObraSocial = async (req, res) => {
    try {
      const { id } = req.params;

      const resultado = await this.obrasSociales.desactivarObraSocial(id);

      if (resultado.affectedRows > 0) {
        res.status(200).json({
          estado: true,
          msg: "Obra Social desactivada con exito",
          id: id,
        });
      } else {
        res.status(404).json({
          estado: false,
          msg: "Obra Social no encontrada",
        });
      }
    } catch (error) {
      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    }
  };
}

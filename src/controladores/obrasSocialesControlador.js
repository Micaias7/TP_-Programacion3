import ObrasSocialesServicio from "../servicios/obrasSocialesServicio.js";

export default class ObrasSocialesControlador {
  constructor() {
    this.obrasSociales = new ObrasSocialesServicio();
  };

  crearObraSocial = async (req, res) => {
    try {
      const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;

      const nuevaObraSocial = await this.obrasSociales.crearObraSocial(
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular
      );

      if (nuevaObraSocial.affectedRows > 0) {
        res.status(201).json({
          estado: true,
          msg: `ID Creado ${nuevaObraSocial.insertId}`,
        });
      };

    } catch (error) {
      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    };
  };

  desactivarObraSocial = async (req, res) => {
    try {
      const { id_obra_social } = req.params;

      const resultado =
        await this.obrasSociales.desactivarObraSocial(id_obra_social);

      if (resultado) {
        res.status(200).json({
          estado: true,
          msg: "Obra Social desactivada con exito",
          id: id_obra_social,
        });
      } else {
        res.status(404).json({
          estado: false,
          msg: "Obra Social no encontrada",
        });
      };

    } catch (error) {
      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    };
  };

  buscarTodas = async (req, res) => {
    try {
      const obrasSociales = await this.obrasSociales.buscarTodas();
      res.status(200).json({
        estado: true,
        obrasSociales: obrasSociales,
        msg: "Lista de obras sociales",
      });

    } catch (error) {
      console.log(`Error en GET /obras-sociales ${error}`);
      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    };
  };

  buscarPorId = async (req, res) => {
    try {
      const id_obra_social = req.params.id_obra_social;
      const obrasSociales =
        await this.obrasSociales.buscarPorId(id_obra_social);

      if (!obrasSociales) {
        return res.status(404).json({
          estado: false,
          msg: "Obra social no encontrada",
        });
      };

      res.status(200).json({
        estado: true,
        obraSocial: obrasSociales,
      });

    } catch (error) {
      console.log(`Error en GET /obras-sociales/:id_obra_social ${error}`);
      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    };
  };

  actualizar = async (req, res) => {
    try {
      const id_obra_social = req.params.id_obra_social;

      const { nombre, descripcion, porcentaje_descuento, es_particular } =
        req.body;

      const result = await this.obrasSociales.actualizar(
        id_obra_social,
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular,
      );

      if (!result) {
        return res.status(404).json({
          estado: false,
          msg: "Obra social no encontrada",
        });
      };

      res.status(200).json({ estado: true, msg: "Obra social modificada" });
      
    } catch (error) {
      console.log(`Error en PUT /obras-sociales/:id ${error}`);
      res.status(500).json({ estado: false, msg: "Error interno" });
    };
  };

  asociarPaciente = async (req, res) => {

  try {

    const { id_obra_social, id_paciente } = req.params;

    const result =
      await this.obrasSociales.asociarPaciente(
        id_paciente,
        id_obra_social
      );

    if (result.affectedRows > 0) {
      return res.status(200).json({
        estado: true,
        msg: "Paciente asociado a la obra social"
      });
    }

    res.status(404).json({
      estado: false,
      msg: "Paciente no encontrado"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      estado: false,
      msg: "Error interno"
    });

  }
};

};



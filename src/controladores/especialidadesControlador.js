import apicache from 'apicache';
import EspecialidadesServicio from "../servicios/especialidadesServicio.js";


export default class EspecialidadesControlador {
  constructor() {
    this.especialidades = new EspecialidadesServicio();
  }

  buscarTodas = async (req, res) => {
    try {
      const especialidades = await this.especialidades.buscarTodas();
      res.status(200).json({
        estado: true,
        msg: "Lista de especialidades",
        especialidades: especialidades,
      });
    } catch (error) {
      console.log(`Error en GET /especialidades ${error}`);
      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const { id_especialidad } = req.params;
      const especialidadesPorId =
        await this.especialidades.buscarPorId(id_especialidad);

      if (especialidadesPorId.length === 0) {
        return res
          .status(404)
          .json({ estado: false, msg: "Especialidad no encontrada" });
      }

      res.status(200).json({
        estado: true,
        msg: "Especialidad encontrada",
        especialidades: especialidadesPorId,
      });
    } catch (error) {
      console.log(`Error en GET /especialidades/:id_especialidad ${error}`);
      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    }
  };

  crearEspecialidad = async (req, res) => {
    try {
      const { nombre } = req.body;

      const nuevaEspecialidad =
        await this.especialidades.crearEspecialidad(nombre);

      if (nuevaEspecialidad.affectedRows === 0) {
        return res.status(400).json({
          estado: false,
          msg: "No se pudo crear la especialidad",
        });
      };

      return res.status(201).json({
        estado: true,
        msg: `Especialidad '${nombre}' creada con éxito.`,
        id: nuevaEspecialidad.insertId
      });
    } catch (error) {
      return res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    };
  };

 editarEspecialidad = async (req, res) => {
    try {
      const { id_especialidad } = req.params;
      const { nombre } = req.body;

      const result = await this.especialidades.editarEspecialidad(
        id_especialidad,
        nombre,
      );

      if (result === null) {
        return res
          .status(404)
          .json({ estado: false, msg: "Especialidad no encontrada" });
      }

      if (result.changedRows === 0) {
        return res.status(400).json({
          estado: false,
          msg: "No se realizaron cambios (el nombre es idéntico o hubo un problema con los datos)"
        });
      }
      
      apicache.clear();

      return res.status(200).json({ estado: true, msg: `Especialidad modificada` });

    } catch (error) {
      console.error("Error en editarEspecialidad:", error);
      return res.status(500).json({ estado: false, msg: "Error interno" });
    }
  };

  eliminarEspecialidad = async (req, res) => {
    try {
      const { id_especialidad } = req.params;

      const result =
        await this.especialidades.eliminarEspecialidad(id_especialidad);

      if (!result || result.affectedRows === 0) {
        return res
          .status(404)
          .json({ estado: false, msg: "Especialidad no encontrada" });
      }

      res.status(200).json({ estado: true, msg: `Especialidad eliminada` });
    } catch (error) {
      res.status(500).json({ estado: false, msg: "Error interno" });
    }
  };
}

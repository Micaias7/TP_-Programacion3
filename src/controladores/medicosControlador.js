import MedicosServicio from "../servicios/medicosServicio.js";

export default class MedicosControlador {
 constructor() {
    this.medicos = new MedicosServicio();
  };

  buscarTodos = async (req, res) => {
    try {
      const medicos = await this.medicos.buscarTodos();

      res.status(200).json({
        estado: true,
        mensaje: "Médicos encontrados.",
        medicos: medicos,
      });

    } catch (error) {
      console.log(`Error en GET /medicos ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: "Error interno",
      });
    };
  };

  buscarPorId = async (req, res) => {    
    try {
      const { id_medico } = req.params;
      const medicos = await this.medicos.buscarPorId(id_medico);

      if (!medicos){
        return res.status(404).json({'estado': false, 'msg': 'Medico no encontrada'});   
      };

      res.status(200).json({
        estado: true,
        mensaje: "Médico encontrado.",
        medicos: medicos,
      });

    } catch (error) {
      console.log(`Error en GET /medicos/:id_medico ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: "Error interno",
      });
    };
  };
    
    asociarEspecialidad = async (req, res)=> {
        try {
            const {id_medico} = req.params;
            const {id_especialidad} = req.body;
            const result = await this.medicos.asociarEspecialidad (
                id_medico,
                id_especialidad
            );
            if (result.affectedRows > 0){
                return res.status(200).json({
                    estado:true,
                    msg: "Especialidad asociada"
                });
               
            }
            res.status(404).json({
                estado:FinalizationRegistry,
                msg:"Medico no encontrado"
            });
        }catch(error){
            console.log("ERROR asociarEspecialidad:", error);
            res.status(500).json({
                estado:false,
                msg:"Error interno"
                
            });

        }
    };

  asociarMedicoObrasSociales = async (req, res) => {
    try {

      const { id_medico } = req.params;
      const { obras_sociales } = req.body;

      const relacion = await this.medicos.asociarMedicoObrasSociales(
        id_medico,
        obras_sociales,
      );

      if (!relacion) {
        return res.status(400).json({
          estado: false,
          mensaje: "No se crearon las relaciones",
        });
      };

      return res.status(201).json({
        estado: "ok",
        mensaje: "Médico y obras sociales relacionadas",
      });
    } catch (error) {
      console.log(`Error en POST /medicos/obras-sociales ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: `Error en POST /medicos/obras-sociales ${error}`,
      });
    };
  };
};

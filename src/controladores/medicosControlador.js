import MedicosServicio from "../servicios/medicosServicio.js";

export default class MedicosControlador {

    constructor(){
        this.medicos = new MedicosServicio();
    };

    buscarTodos= async (req, res)=> {
        try {
            
            const medicos = await this.medicos.buscarTodos();
            res.status(200).json({
                'estado': true,
                'medicos': medicos
            });
        }catch (error){
            console.log (`Error en GET /medicos ${error}`);
            res.status(500).json({
                'estado':false,
                'msg': 'Error interno'
            });
        };
        
    };

    buscarPorId = async (req,res)=> {
        try{
            const {id_medico}= req.params ;
            const medicosPorId = await this.medicos.buscarPorId(id_medico);

            if (medicosPorId.length === 0) {
    return res.status(404).json({
        estado: false,
        msg: 'Medico no encontrado'
    });
}

    res.status(200).json({
    estado: true,
    medicos: medicosPorId
});

        } catch (error){
            console.log (`Error en GET/medicos/:id_medico ${error}`);

            res.status (500).json ({
                'estado' : false ,
                'msg': 'Error interno'
            });
        };
    };


    crearMedico = async (req, res) => {

    try {

        const {
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        } = req.body;

        const nuevoMedico = await this.medicos.crearMedico(
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        );

        if (nuevoMedico.affectedRows > 0) {
            res.status(201).json({
                estado: true,
                msg: `Id Creado ${nuevoMedico.insertId}`
            });
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({
            estado: false,
            msg: "Error interno"
        });
    }
};


    editarMedico = async (req , res) => {
    try {

        const {id_medico} = req.params ;

        const {
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        } = req.body ;

        const medicoEditar = await this.medicos.buscarPorId(id_medico);

        if (medicoEditar.length === 0){
            return res.status(404).json({
                estado: false,
                msg: 'Medico no encontrado'
            });
        }

        const result = await this.medicos.editarMedico(
            id_medico,
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        );

        if (result.affectedRows > 0){
            res.status(200).json({
                estado: true,
                msg: 'Medico modificado'
            });
        }

    } catch (error){
        res.status(500).json({
            estado: false,
            msg: 'Error interno'
        });
    }
};



    eliminarMedico = async (req,res)=> {
        try {
            const {id_medico}=req.params;
            
            const medicoEliminar = await this.medicos.buscarPorId (id_medico);

            if (medicoEliminar.length===0){
                return res.status(404).json({'estado': false , ' msg': 'Medico no encontrado'});
            };

            const result = await this.medicos.eliminarMedico(id_medico);
            
            if (result.affectedRows >0){
                res.status (200).json({ 'estado': true , 'msg': 'Medico eliminado'});
            };

        }catch (error){
            res.status (500).json({'estado':false , 'msg':'Error interno'});
        };
    };
};

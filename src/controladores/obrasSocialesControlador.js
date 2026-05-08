import ObrasSocialesServicio from "../servicios/obrasSocialesServicio.js";

export default class ObrasSocialesControlador {

    constructor (){
        this.obrasSociales = new ObrasSocialesServicio();
    };

    crearObraSocial = async (req , res) => {

        try {

            const { nombre } = req.body;

            const nuevaObraSocial = await this.obrasSociales.crearObraSocial(nombre);

            if (nuevaObraSocial.affectedRows > 0){

                res.status(201).json({
                    'estado': true,
                    'msg': `ID Creado ${nuevaObraSocial.insertId}`
                });

            };

        } catch (error){

            res.status(500).json({
                'estado': false,
                'msg': 'Error interno'
            });

        };

    };

};



import ObrasSociales from "../db/obrasSociales.js";

export default class ObrasSocialesServicio{
    constructor(){
        this.obrasSociales =new ObrasSociales();
    };

    crearObraSocial =(nombre)=> {
        return this.obrasSociales.crearObraSocial(nombre);
    };
};
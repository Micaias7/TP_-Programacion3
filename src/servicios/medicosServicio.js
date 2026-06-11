import Medicos from "../db/medicos.js";

export default class MedicosServicio {
    constructor (){
        this.medicos = new Medicos();
    };

    buscarTodos=()=>{
        return this.medicos.buscarTodos();
    };

    buscarPorId = (id_medico) => {
        return this.medicos.buscarPorId(id_medico);
    };

    crearMedico = (
    id_usuario,
    id_especialidad,
    matricula,
    descripcion,
    valor_consulta
) => {
    return this.medicos.crearMedico(
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta
    );
};

        editarMedico = (
        id_medico,
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta
    ) => {
        return this.medicos.editarMedico(
            id_medico,
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        );
    };

    eliminarMedico = (id_medico)=>{
        return this.medicos.eliminarMedico(id_medico);
    };
};
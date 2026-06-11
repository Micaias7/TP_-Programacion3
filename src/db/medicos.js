import {pool} from "./conexion.js" ; 

export default class Medicos {
    
    buscarTodos = async () => {
        
        const sql = 'SELECT * from medicos ' ;
        const [medicos] = await pool.query (sql);
        
        return medicos ;
    };

    buscarPorId = async (id_medico) => {
        const sql = 'SELECT * from medicos WHERE  id_medico = ? ' ;
        const [medicos] = await pool.execute (sql, [id_medico]);
        return medicos ;
    };

    crearMedico = async (
    id_usuario,
    id_especialidad,
    matricula,
    descripcion,
    valor_consulta
) => {
    const sql = `
        INSERT INTO medicos
        (id_usuario, id_especialidad, matricula, descripcion, valor_consulta)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta
    ]);

    return result;
};

        

    editarMedico = async (
    id_medico,
    id_usuario,
    id_especialidad,
    matricula,
    descripcion,
    valor_consulta
) => {

    const sql = `
        UPDATE medicos
        SET id_usuario = ?,
            id_especialidad = ?,
            matricula = ?,
            descripcion = ?,
            valor_consulta = ?
        WHERE id_medico = ?
    `;

    const [result] = await pool.execute(sql, [
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta,
        id_medico
    ]);

    return result;
};


    eliminarMedico = async (id_medico) => {
    const sql = 'DELETE FROM medicos WHERE id_medico = ?';
    const [result] = await pool.execute(sql, [id_medico]);
    return result;
};



};
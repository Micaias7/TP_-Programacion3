import { pool } from "./conexion.js";

export default class ObrasSociales {

    crearObraSocial = async (nombre) => {
        const sql = 'INSERT INTO obras_sociales (nombre) VALUES (?)';
        const [result] = await pool.execute(sql, [nombre]);
        return result;
    };
};
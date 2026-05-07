import { pool } from "./conexion.js";

export default class Especialidades {

  buscarTodas = async () => {    

    const sql = 'SELECT * FROM especialidades WHERE activo = 1';
    const [especialidades, fields] = await pool.query(sql);
    return especialidades;

  };
};
import { pool } from "./conexion.js";

export default class ObrasSociales {

  buscarTodas = async () => {

    const sql = 'SELECT * FROM obras_sociales WHERE activo = 1';
    const [obrasSociales, fields] = await pool.query(sql);
    return obrasSociales;

  };

  buscarPorId = async (id_obra_social) => {

    const sql = 'SELECT * FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?';
    const [obrasSociales, fields] = await pool.execute(sql, [id_obra_social]);
    return obrasSociales;

  };

};

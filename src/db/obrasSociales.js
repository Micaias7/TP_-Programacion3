import { pool } from "./conexion.js";

export default class ObrasSociales {
  crearObraSocial = async (
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular
  ) => {

    const sql = `
      INSERT INTO obras_sociales
      (nombre, descripcion, porcentaje_descuento, es_particular)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular
    ]);

    return result;
  };

  desactivarObraSocial = async (id_obra_social) => {
    const sql = "UPDATE obras_sociales SET activo = 0 WHERE activo = 1 AND id_obra_social = ?";
    const [result] = await pool.execute(sql, [id_obra_social]);
    return result;
  };

  buscarTodas = async () => {
    const sql = "SELECT * FROM obras_sociales WHERE activo = 1";
    const [obrasSociales] = await pool.query(sql);
    return obrasSociales;
  };

  buscarPorId = async (id_obra_social) => {
    const sql =
      "SELECT * FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?";
    const [obrasSociales] = await pool.execute(sql, [id_obra_social]);
    return obrasSociales[0];
  };

  actualizar = async (
    id_obra_social,
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular,
  ) => {
    const sql =
      "UPDATE obras_sociales SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ? WHERE id_obra_social = ?";
    const [result] = await pool.execute(sql, [
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular,
      id_obra_social,
    ]);
    return result;
  };

  asociarPaciente = async (id_paciente, id_obra_social) => {

    const sql = `
        UPDATE pacientes
        SET id_obra_social = ?
        WHERE id_paciente = ?
    `;

    const [result] = await pool.execute(sql, [
        id_obra_social,
        id_paciente
    ]);

    return result;
};

}

import { pool } from "./conexion.js";

export default class Usuarios {
  buscarPorId = async (id_usuario) => {
    const sql = `SELECT * FROM usuarios WHERE id_usuario = ?`;
    const [usuario] = await pool.execute(sql, [id_usuario]);
    return usuario[0];
  };

  buscarPorEmail = async (email) => {
    const sql = `SELECT id_usuario FROM usuarios WHERE email = ?`;
    const [usuario] = await pool.execute(sql, [email]);
    return usuario[0];
  };

  guardarTokenRestablecimiento = async (
    id_usuario,
    token,
    expiracion,
    conexion = pool,
  ) => {
    const sql = `
      UPDATE usuarios
      SET reset_token = ?, reset_token_expiration = ?
      WHERE id_usuario = ?
    `;
    const [result] = await conexion.execute(sql, [
      token,
      expiracion,
      id_usuario,
    ]);
    return result;
  };

  buscarPorTokenReset = async (token) => {
    const sql = `
      SELECT id_usuario, reset_token_expiration
      FROM usuarios
      WHERE reset_token = ?
    `;
    const [usuario] = await pool.execute(sql, [token]);
    return usuario[0];
  };

  actualizarContrasenia = async (id_usuario, contrasenia, conexion = pool) => {
    const sql = `
      UPDATE usuarios
      SET contrasenia = SHA2(?, 256), reset_token = NULL, reset_token_expiration = NULL
      WHERE id_usuario = ?
    `;
    const [result] = await conexion.execute(sql, [contrasenia, id_usuario]);
    return result;
  };

  crearUsuario = async (
    { nombres, apellido, email, contrasenia, rol, foto_path = null },
    conexion = pool,
  ) => {
    const sql = `
      INSERT INTO usuarios (nombres, apellido, email, contrasenia, rol, foto_path, activo)
      VALUES (?, ?, ?, SHA2(?, 256), ?, ?, 1)
    `;
    const [result] = await conexion.execute(sql, [
      nombres,
      apellido,
      email,
      contrasenia,
      rol,
      foto_path,
    ]);
    return result;
  };

  buscar = async (email, contrasenia) => {
    const sql = `SELECT u.id_usuario, CONCAT(u.nombres, ' ', u.apellido) as usuario, u.rol
                        FROM usuarios  AS u
                        WHERE u.email = ? 
                            AND u.contrasenia = SHA2(?, 256) 
                            AND u.activo = 1;`;
    const [result] = await pool.execute(sql, [email, contrasenia]);
    return result[0];
  };
}

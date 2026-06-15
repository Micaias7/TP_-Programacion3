import Usuarios from "../db/usuarios.js";
import Medicos from "../db/medicos.js";
import Pacientes from "../db/pacientes.js";
import { pool } from "../db/conexion.js";

export default class UsuariosServicio {
  constructor() {
    this.usuarios = new Usuarios();
    this.medicos = new Medicos();
    this.pacientes = new Pacientes();
  }

  buscarPorId = (id_usuario) => {
    return this.usuarios.buscarPorId(id_usuario);
  };

  buscarPorEmail = (email) => {
    return this.usuarios.buscarPorEmail(email);
  };

  buscar = (email, contrasenia) => {
    return this.usuarios.buscar(email, contrasenia);
  };

  registrar = async ({
    nombres,
    apellido,
    email,
    contrasenia,
    rol,
    foto_path = null,
    id_especialidad = null,
    id_obra_social = null,
  }) => {
    const usuarioExistente = await this.buscarPorEmail(email);
    if (usuarioExistente) {
      throw new Error("El correo electrónico ya está registrado.");
    }

    const conexion = await pool.getConnection();
    try {
      await conexion.beginTransaction();

      const resultUsuario = await this.usuarios.crearUsuario(
        { nombres, apellido, email, contrasenia, rol, foto_path },
        conexion,
      );

      const id_usuario = resultUsuario.insertId;

      if (rol === 1) {
        await this.medicos.crearMedico(id_usuario, id_especialidad, conexion);
      } else if (rol === 2) {
        await this.pacientes.crearPaciente(
          id_usuario,
          id_obra_social,
          conexion,
        );
      }

      await conexion.commit();
      await conexion.release();

      return { id_usuario, rol, email };
    } catch (error) {
      await conexion.rollback();
      await conexion.release();
      throw error;
    }
  };
}

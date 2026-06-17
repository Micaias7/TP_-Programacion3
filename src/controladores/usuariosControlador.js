import UsuariosServicio from "../servicios/usuariosServicio.js";

export default class UsuariosControlador {
  constructor() {
    this.usuariosServicio = new UsuariosServicio();
  }

  obtenerMiPerfil = async (req, res) => {
    try {
      const usuario = await this.usuariosServicio.buscarPorId(
        req.user.id_usuario,
      );

      if (!usuario) {
        return res.status(404).json({
          estado: false,
          mensaje: "Usuario no encontrado.",
        });
      }

      return res.status(200).json({
        estado: true,
        datos: usuario,
      });
    } catch (error) {
      return res.status(500).json({
        estado: false,
        mensaje: error.message,
      });
    }
  };
}

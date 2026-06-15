import jwt from "jsonwebtoken";
import passport from "passport";
import UsuariosServicio from "../servicios/usuariosServicio.js";

export default class AuthController {
  login = async (req, res) => {
    passport.authenticate("local", { session: false }, (err, usuario, info) => {
      if (err || !usuario) {
        return res.status(400).json({
          estado: false,
          mensaje: "Solicitud incorrecta.",
        });
      }
      // ARMO EL TOKEN Y ENVIO CLIENTE
      req.login(usuario, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        // ARMAMOS EL TOKEN CON LOS DATOS DEL USUARIO Y UNA EXPIRACION
        const token = jwt.sign(usuario, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.json({
          estado: true,
          token: token,
        });
      });
    })(req, res);
  };

  registrar = async (req, res) => {
    try {
      const {
        nombres,
        apellido,
        email,
        contrasenia,
        rol,
        foto_path,
        id_especialidad,
        id_obra_social,
      } = req.body;

      const usuariosServicio = new UsuariosServicio();
      const nuevoUsuario = await usuariosServicio.registrar({
        nombres,
        apellido,
        email,
        contrasenia,
        rol,
        foto_path,
        id_especialidad,
        id_obra_social,
      });

      return res.status(201).json({
        estado: true,
        mensaje: "Usuario registrado correctamente.",
        usuario: {
          id_usuario: nuevoUsuario.id_usuario,
          email: nuevoUsuario.email,
          rol: nuevoUsuario.rol,
        },
      });
    } catch (error) {
      console.log(`Error en POST /auth/register ${error}`);
      return res.status(400).json({
        estado: false,
        mensaje: error.message || "No se pudo registrar el usuario.",
      });
    }
  };

  solicitarRestablecerContrasenia = async (req, res) => {
    try {
      const { email } = req.body;
      const usuariosServicio = new UsuariosServicio();
      const token =
        await usuariosServicio.solicitarRestablecerContrasenia(email);

      return res.status(200).json({
        estado: true,
        mensaje: "Token de restablecimiento generado correctamente.",
        token,
      });
    } catch (error) {
      console.log(`Error en POST /auth/forgot-password ${error}`);
      return res.status(400).json({
        estado: false,
        mensaje: error.message || "No se pudo generar el token.",
      });
    }
  };

  restablecerContrasenia = async (req, res) => {
    try {
      const { token, contrasenia } = req.body;
      const usuariosServicio = new UsuariosServicio();
      await usuariosServicio.restablecerContrasenia({ token, contrasenia });

      return res.status(200).json({
        estado: true,
        mensaje: "Contraseña restablecida correctamente.",
      });
    } catch (error) {
      console.log(`Error en POST /auth/reset-password ${error}`);
      return res.status(400).json({
        estado: false,
        mensaje: error.message || "No se pudo restablecer la contraseña.",
      });
    }
  };
}

import express from "express";
import UsuariosControlador from "../../controladores/usuariosControlador.js";

const router = express.Router();
const usuariosControlador = new UsuariosControlador();

router.get(
  "/mi-perfil",
  usuariosControlador.obtenerMiPerfil
);

export { router };
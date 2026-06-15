import express from "express";
import ObrasSocialesControlador from "../../controladores/obrasSocialesControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { validarId } from "../../middlewares/validarId.js";
import { validacionObrasSociales } from "../../middlewares/validacionesObrasSociales.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = express.Router();

const obrasSocialesControlador = new ObrasSocialesControlador();

router.get("/",
  autorizarUsuarios([3]),
  obrasSocialesControlador.buscarTodas
);

router.get(
  "/:id_obra_social",
  autorizarUsuarios([3]),
  validarId("id_obra_social"),
  validarCampos,
  obrasSocialesControlador.buscarPorId,
);

router.put(
  "/:id_obra_social",
  autorizarUsuarios([3]),
  validarId("id_obra_social"),
  validacionObrasSociales,
  validarCampos,
  obrasSocialesControlador.actualizar,
);

router.put(
  "/:id_obra_social/pacientes/:id_paciente",
  autorizarUsuarios([3]),
  validarId("id_obra_social"),
  validarId("id_paciente"),
  validarCampos,
  obrasSocialesControlador.asociarPaciente
);

router.post(
  "/",
  autorizarUsuarios([3]),
  validacionObrasSociales,
  validarCampos,
  obrasSocialesControlador.crearObraSocial,
);

router.delete(
  "/:id_obra_social",
  autorizarUsuarios([3]),
  validarId("id_obra_social"),
  validarCampos,
  obrasSocialesControlador.desactivarObraSocial,
);

export { router };

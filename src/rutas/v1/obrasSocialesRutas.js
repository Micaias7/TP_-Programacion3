import express from "express";
import ObrasSocialesControlador from "../../controladores/obrasSocialesControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { validarId } from "../../middlewares/validarId.js";
import { validacionObrasSociales } from "../../middlewares/validacionesObrasSociales.js";

const router = express.Router();

const obrasSocialesControlador = new ObrasSocialesControlador();

router.get("/", obrasSocialesControlador.buscarTodas);

router.get(
  "/:id_obra_social",
  validarId("id_obra_social"),
  validarCampos,
  obrasSocialesControlador.buscarPorId,
);

router.put(
  "/:id_obra_social",
  validarId("id_obra_social"),
  validacionObrasSociales,
  validarCampos,
  obrasSocialesControlador.actualizar,
);

router.post(
  "/",
  validacionObrasSociales,
  validarCampos,
  obrasSocialesControlador.crearObraSocial,
);

router.delete(
  "/:id_obra_social",
  validarId("id_obra_social"),
  validarCampos,
  obrasSocialesControlador.desactivarObraSocial,
);

export { router };

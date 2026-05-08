import express from "express";
import ObrasSocialesControlador from "../../controladores/obrasSocialesControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

const obrasSocialesControlador = new ObrasSocialesControlador();

router.post("/", obrasSocialesControlador.crearObraSocial);
router.delete("/:id", obrasSocialesControlador.desactivarObraSocial);

export { router };

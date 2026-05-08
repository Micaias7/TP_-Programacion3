import express from "express";
import EspecialidadesControlador from "../../controladores/especialidadesControlador.js";
import { validarId } from "../../middlewares/validarId.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { validarNombre } from "../../middlewares/validacionesEspecialidades.js";

const router = express.Router();

const especialidadesControlador = new EspecialidadesControlador();

router.get("/", especialidadesControlador.buscarTodas);
router.get(
  "/:id_especialidad",
  validarId("id_especialidad"),
  validarCampos,
  especialidadesControlador.buscarPorId,
);
router.post(
  "/",
  validarNombre,
  validarCampos,
  especialidadesControlador.crearEspecialidad,
);
router.put(
  "/:id_especialidad",
  validarId("id_especialidad"),
  validarNombre,
  validarCampos,
  especialidadesControlador.editarEspecialidad,
);
router.delete(
  "/:id_especialidad",
  validarId("id_especialidad"),
  validarCampos,
  especialidadesControlador.eliminarEspecialidad,
);

export { router };

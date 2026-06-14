import express from 'express';
import apicache from 'apicache';
import EspecialidadesControlador from "../../controladores/especialidadesControlador.js";
import { validarId } from "../../middlewares/validarId.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { validacionEspecialidades } from "../../middlewares/validacionesEspecialidades.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = express.Router();

const cache = apicache.middleware;

const especialidadesControlador = new EspecialidadesControlador();

router.get(
  "/",
  autorizarUsuarios([2, 3]),
  cache("5 minutes"),
  especialidadesControlador.buscarTodas,
);

router.get(
  "/:id_especialidad",
  autorizarUsuarios([3]),
  validarId("id_especialidad"),
  validarCampos,
  especialidadesControlador.buscarPorId,
);

router.post(
  "/",
  autorizarUsuarios([3]),
  validacionEspecialidades,
  validarCampos,
  especialidadesControlador.crearEspecialidad,
);

router.put(
  "/:id_especialidad",
  autorizarUsuarios([3]),
  validarId("id_especialidad"),
  validacionEspecialidades,
  validarCampos,
  especialidadesControlador.editarEspecialidad,
);

router.delete(
  "/:id_especialidad",
  autorizarUsuarios([3]),
  validarId("id_especialidad"),
  validarCampos,
  especialidadesControlador.eliminarEspecialidad,
);

export { router };

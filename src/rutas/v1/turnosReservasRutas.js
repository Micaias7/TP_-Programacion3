import express from "express";
import { check, param } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { validarId } from "../../middlewares/validarId.js";
import TurnosReservasControlador from "../../controladores/turnosReservasControlador.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = express.Router();
const turnosReservasControlador = new TurnosReservasControlador();

router.get('/', autorizarUsuarios([1,2]), turnosReservasControlador.buscarTodos);

router.post(
  "/",
  autorizarUsuarios([3]),
  [
    check("id_medico").notEmpty().withMessage("El id_medico es obligatorio."),
    check("id_paciente").notEmpty().withMessage("El id_paciente es obligatorio."),
    check("fecha_hora").notEmpty().withMessage("La fecha_hora es obligatoria."),
    validarCampos,
  ],
  turnosReservasControlador.crear,
);

router.delete(
  "/:id",
  autorizarUsuarios([3]),
  validarId("id"),
  validarCampos,
  turnosReservasControlador.desactivarTurno,
);

router.put(
  "/:id",
  autorizarUsuarios([3]),
  validarId("id"),
  [
    check("fecha_hora").notEmpty().withMessage("La fecha_hora es obligatoria."),
    validarCampos,
  ],
  turnosReservasControlador.modificarFecha,
);

export { router };
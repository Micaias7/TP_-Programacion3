import express from "express";
import MedicosControlador from "../../controladores/medicosControlador.js";

import { param, check } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

const medicosControlador = new MedicosControlador();

router.get("/", medicosControlador.buscarTodos);

router.get(
  "/:id_medico",
  [
    param("id_medico")
      .notEmpty()
      .withMessage("El id_medico es obligatorio.")
      .isInt()
      .withMessage("El id_medico debe ser un número entero."),
    validarCampos
  ],
  medicosControlador.buscarPorId,
);

router.post(
  "/:id_medico/obras-sociales",
  [
    param("id_medico")
      .notEmpty()
      .withMessage("El id_medico es obligatorio.")
      .isInt()
      .withMessage("El id_medico debe ser un número entero."),
    check("obras_sociales")
      .isArray()
      .withMessage("obras_sociales debe ser un array.")
      .notEmpty()
      .withMessage("obras_sociales no puede estar vacío."),
    check("obras_sociales.*.id_obra_social")
      .notEmpty()
      .withMessage("Cada obra social debe tener id_obra_social.")
      .isInt()
      .withMessage("id_obra_social debe ser un número entero."),
    validarCampos
  ],
  medicosControlador.asociarMedicoObrasSociales,
);

export { router };

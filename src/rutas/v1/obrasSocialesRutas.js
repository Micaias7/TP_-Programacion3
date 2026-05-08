import express from "express";
import { check, param } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";
import ObrasSocialesControlador from "../../controladores/obrasSocialesControlador.js";

const router = express.Router();
const obrasSocialesControlador = new ObrasSocialesControlador();

router.get("/", obrasSocialesControlador.buscarTodas);

router.get(
  "/:id_obra_social",
  [
    param("id_obra_social", "El parámetro debe ser numérico").isInt({ min: 1 }),
    validarCampos,
  ],
  obrasSocialesControlador.buscarPorId,
);

router.put(
  "/:id_obra_social",
  [
    param("id_obra_social", "El parámetro debe ser numérico").isInt(),
    check("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isLength({ max: 120 })
      .withMessage("Máximo 120 caracteres"),
    check("descripcion")
      .notEmpty()
      .withMessage("La descripción es obligatoria")
      .isLength({ max: 255 })
      .withMessage("Máximo 255 caracteres"),
    check("porcentaje_descuento")
      .notEmpty()
      .withMessage("El porcentaje es obligatorio")
      .isDecimal()
      .withMessage("Debe ser un número decimal"),
    check("es_particular")
      .notEmpty()
      .withMessage("es_particular es obligatorio")
      .isBoolean()
      .withMessage("Debe ser true o false"),
    validarCampos,
  ],
  obrasSocialesControlador.actualizar,
);

router.post("/", obrasSocialesControlador.crearObraSocial);

router.delete(
  "/:id_obra_social",
  [
    param("id_obra_social", "El parámetro debe ser numérico").isInt({ min: 1 }),
    validarCampos,
  ],
  obrasSocialesControlador.desactivarObraSocial,
);

export { router };

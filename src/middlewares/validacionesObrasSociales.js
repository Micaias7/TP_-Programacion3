import { check } from "express-validator";

export const validacionObrasSociales = [
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
];

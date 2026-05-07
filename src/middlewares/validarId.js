import { param } from "express-validator";

export const validarId = (nombreParametro) => {
  return [
    param(nombreParametro).isInt().withMessage(`El parametro debe ser numerico`)
  ];
};
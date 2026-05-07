import { check, param } from "express-validator";

export const validarNombre = [
  check('nombre', 'El nombre es obligatorio').notEmpty()
  .isLength({ max: 40 })
  .withMessage('El nombre no debe ser mayor 40 caracteres')
];
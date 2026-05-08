import { check } from "express-validator";

export const validacionEspecialidades = [
  check('nombre', 'El nombre es obligatorio').notEmpty()
  .isLength({ max: 40 })
  .withMessage('El nombre no debe ser mayor a 40 caracteres')
];
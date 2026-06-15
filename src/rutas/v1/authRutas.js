import express from "express";
import AuthController from "../../controladores/authControlador.js";

import { check } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@dominio.com
 *               contrasenia:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token
 *       400:
 *         description: Credenciales incorrectas
 */

router.post(
  "/login",
  [
    check("email")
      .notEmpty()
      .withMessage("El correo electrónico es requerido!.")
      .isEmail()
      .withMessage("Revisar el formato del correo electrónico."),
    check("contrasenia").notEmpty().withMessage("La contraseña es requerida."),
    validarCampos,
  ],
  authController.login,
);

export { router };

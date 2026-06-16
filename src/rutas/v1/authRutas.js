import express from "express";
import AuthController from "../../controladores/authControlador.js";
import UsuariosServicio from "../../servicios/usuariosServicio.js";

import { check } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { upload } from "../../middlewares/multerConfig.js";

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

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 example: Perez
 *               email:
 *                 type: string
 *                 example: juan.perez@dominio.com
 *               contrasenia:
 *                 type: string
 *                 example: password123
 *               rol:
 *                 type: integer
 *                 example: 2
 *               foto_path:
 *                 type: string
 *                 example: /uploads/juan.jpg
 *               id_especialidad:
 *                 type: integer
 *                 example: 1
 *               id_obra_social:
 *                 type: integer
 *                 example: 2
 *             required:
 *               - nombres
 *               - apellido
 *               - email
 *               - contrasenia
 *               - rol
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error de validación o registro
 */
router.post(
  "/register",
  upload.single("foto"),
  [
    check("nombres").notEmpty().withMessage("El nombre es obligatorio."),
    check("apellido").notEmpty().withMessage("El apellido es obligatorio."),
    check("email")
      .notEmpty()
      .withMessage("El correo electrónico es requerido!.")
      .isEmail()
      .withMessage("Revisar el formato del correo electrónico.")
      .bail()
      .custom(async (email) => {
        const usuariosServicio = new UsuariosServicio();
        const usuarioExistente = await usuariosServicio.buscarPorEmail(email);
        if (usuarioExistente) {
          throw new Error("El correo electrónico ya está en uso.");
        }
        return true;
      }),
    check("contrasenia")
      .notEmpty()
      .withMessage("La contraseña es requerida.")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres."),
    check("rol")
      .notEmpty()
      .withMessage("El rol es obligatorio.")
      .isInt({ min: 1, max: 3 })
      .withMessage(
        "El rol debe ser 1 (Médico), 2 (Paciente) o 3 (Administrador).",
      ),
    check("foto_path")
      .optional()
      .isString()
      .withMessage("foto_path debe ser una cadena de texto."),
    check("id_especialidad")
      .optional()
      .isInt()
      .withMessage("id_especialidad debe ser un número entero."),
    check("id_obra_social")
      .optional()
      .isInt()
      .withMessage("id_obra_social debe ser un número entero."),
    validarCampos,
  ],
  authController.registrar,
);

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Solicitar restablecimiento de contraseña
 *     description: Genera un token de restablecimiento para un usuario registrado.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@correo.com
 *     responses:
 *       200:
 *         description: Token generado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: Token de restablecimiento generado correctamente.
 *                 token:
 *                   type: string
 *                   example: a3f8b5d7c9e1f4...
 *       400:
 *         description: Error de validación o usuario inexistente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: No existe ningún usuario con ese correo electrónico.
 */

router.post(
  "/forgot-password",
  [
    check("email")
      .notEmpty()
      .withMessage("El correo electrónico es requerido!.")
      .isEmail()
      .withMessage("Revisar el formato del correo electrónico."),
    validarCampos,
  ],
  authController.solicitarRestablecerContrasenia,
);

/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Restablecer contraseña
 *     description: Permite establecer una nueva contraseña utilizando un token de restablecimiento válido.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - contrasenia
 *             properties:
 *               token:
 *                 type: string
 *                 example: 8d9f3b7c2e4a5f6d7c8b9a0e1f2d3c4b
 *               contrasenia:
 *                 type: string
 *                 minLength: 6
 *                 example: NuevaClave123
 *     responses:
 *       200:
 *         description: Contraseña restablecida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: Contraseña restablecida correctamente.
 *       400:
 *         description: Token inválido, expirado o datos incorrectos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: El token de restablecimiento ha expirado.
 */

router.post(
  "/reset-password",
  [
    check("token")
      .notEmpty()
      .withMessage("El token de restablecimiento es obligatorio."),
    check("contrasenia")
      .notEmpty()
      .withMessage("La contraseña es requerida.")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres."),
    validarCampos,
  ],
  authController.restablecerContrasenia,
);

export { router };

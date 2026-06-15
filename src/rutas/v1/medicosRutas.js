import express from "express";
import MedicosControlador from "../../controladores/medicosControlador.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import { param, check } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

const medicosControlador = new MedicosControlador();

/**
 * @swagger
 * /api/v1/medicos:
 *   get:
 *     summary: Obtener todos los médicos
 *     tags:
 *       - Medicos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de médicos
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: Usuario sin permisos para acceder al recurso
 *         content:
 *           application/json:
 *              example:
 *                estado: false
 *                mensaje: Acceso Denegado 
 *       500:
 *         description: Error interno
 */

router.get("/",
  autorizarUsuarios([2, 3]),
  medicosControlador.buscarTodos
);

/**
 * @swagger
 * /api/v1/medicos/especialidad/{id_especialidad}:
 *   get:
 *     summary: Obtener médicos por especialidad
 *     tags:
 *       - Medicos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especialidad
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de médicos de la especialidad
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: Usuario sin permisos para acceder al recurso
 *         content:
 *           application/json:
 *              example:
 *                estado: false
 *                mensaje: Acceso Denegado
 *       404:
 *         description: No hay médicos de esa especialidad
 *       500:
 *         description: Error interno
 */

router.get(
  "/especialidad/:id_especialidad",
  autorizarUsuarios([2,3]),
  [
    param("id_especialidad")
      .isInt()
      .withMessage(`El id_especialidad debe ser un número entero.`),
    validarCampos,
  ],
  medicosControlador.buscarPorEspecialidad,
);

/**
 * @swagger
 * /api/v1/medicos/{id_medico}:
 *   get:
 *     summary: Obtener médico por ID
 *     tags:
 *       - Medicos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: Usuario sin permisos para acceder al recurso
 *         content:
 *           application/json:
 *              example:
 *                estado: false
 *                mensaje: Acceso Denegado
 *       404:
 *         description: Médico no encontrado
 *       500:
 *         description: Error interno
 */

router.get(
  "/:id_medico",
  autorizarUsuarios([3]),
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

/**
 * @swagger
 * /api/v1/medicos/{id_medico}/obras-sociales:
 *   post:
 *     summary: Asociar obras sociales a un médico
 *     tags:
 *       - Medicos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               obras_sociales:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_obra_social:
 *                       type: integer
 *                       example: 1
 *     responses:
 *       201:
 *         description: Médico y obras sociales relacionadas
 *       400:
 *         description: No se crearon las relaciones
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: Usuario sin permisos para acceder al recurso
 *         content:
 *           application/json:
 *              example:
 *                estado: false
 *                mensaje: Acceso Denegado
 *       500:
 *         description: Error interno
 */

router.post(
  "/:id_medico/obras-sociales",
  autorizarUsuarios([3]),
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

/**
 * @swagger
 * /api/v1/medicos/{id_medico}/especialidad:
 *   put:
 *     summary: Asociar especialidad a un médico
 *     tags:
 *       - Medicos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_especialidad:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Especialidad asociada
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: Usuario sin permisos para acceder al recurso
 *         content:
 *           application/json:
 *              example:
 *                estado: false
 *                mensaje: Acceso Denegado
 *       404:
 *         description: Médico no encontrado
 *       500:
 *         description: Error interno
 */

router.put(
  "/:id_medico/especialidad",
  autorizarUsuarios([3]),
  [
    param("id_medico")
      .isInt()
      .withMessage("El id_medico debe ser un número entero."),

    check("id_especialidad")
      .isInt()
      .withMessage("El id_especialidad debe ser un número entero."),

    validarCampos
  ],
  medicosControlador.asociarEspecialidad
);

export { router };

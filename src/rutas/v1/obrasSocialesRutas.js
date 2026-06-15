import express from "express";
import ObrasSocialesControlador from "../../controladores/obrasSocialesControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { validarId } from "../../middlewares/validarId.js";
import { validacionObrasSociales } from "../../middlewares/validacionesObrasSociales.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = express.Router();

const obrasSocialesControlador = new ObrasSocialesControlador();

/**
 * @swagger
 * /api/v1/obras-sociales:
 *   get:
 *     summary: Obtener todas las obras sociales
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de obras sociales
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
  autorizarUsuarios([3]),
  obrasSocialesControlador.buscarTodas
);

/**
 * @swagger
 * /api/v1/obras-sociales/{id_obra_social}:
 *   get:
 *     summary: Obtener obra social por ID
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Obra social encontrada
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
 *         description: Obra social no encontrada
 *       500:
 *         description: Error interno
 */

router.get(
  "/:id_obra_social",
  autorizarUsuarios([3]),
  validarId("id_obra_social"),
  validarCampos,
  obrasSocialesControlador.buscarPorId,
);

/**
 * @swagger
 * /api/v1/obras-sociales:
 *   post:
 *     summary: Crear una obra social
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: OSDE
 *               descripcion:
 *                 type: string
 *                 example: Obra social OSDE
 *               porcentaje_descuento:
 *                 type: number
 *                 example: 10.00
 *               es_particular:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Obra social creada
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
  "/",
  autorizarUsuarios([3]),
  validacionObrasSociales,
  validarCampos,
  obrasSocialesControlador.crearObraSocial,
);

/**
 * @swagger
 * /api/v1/obras-sociales/{id_obra_social}:
 *   put:
 *     summary: Editar una obra social
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_obra_social
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
 *               nombre:
 *                 type: string
 *                 example: OSDE
 *               descripcion:
 *                 type: string
 *                 example: Obra social OSDE
 *               porcentaje_descuento:
 *                 type: number
 *                 example: 10.00
 *               es_particular:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Obra social modificada
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
 *         description: Obra social no encontrada
 *       500:
 *         description: Error interno
 */

router.put(
  "/:id_obra_social",
  autorizarUsuarios([3]),
  validarId("id_obra_social"),
  validacionObrasSociales,
  validarCampos,
  obrasSocialesControlador.actualizar,
);

/**
 * @swagger
 * /api/v1/obras-sociales/{id_obra_social}/pacientes/{id_paciente}:
 *   put:
 *     summary: Asociar un paciente a una obra social
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         description: ID de la obra social
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         description: ID del paciente
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Paciente asociado correctamente
 *         content:
 *           application/json:
 *             example:
 *               estado: true
 *               msg: Paciente asociado a la obra social
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
 *         description: Paciente no encontrado
 *         content:
 *           application/json:
 *             example:
 *               estado: false
 *               msg: Paciente no encontrado
 *       500:
 *         description: Error interno
 */

router.put(
  "/:id_obra_social/pacientes/:id_paciente",
  autorizarUsuarios([3]),
  validarId("id_obra_social"),
  validarId("id_paciente"),
  validarCampos,
  obrasSocialesControlador.asociarPaciente
);

/**
 * @swagger
 * /api/v1/obras-sociales/{id_obra_social}:
 *   delete:
 *     summary: Desactivar una obra social
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Obra social desactivada
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
 *         description: Obra social no encontrada
 *       500:
 *         description: Error interno
 */

router.delete(
  "/:id_obra_social",
  autorizarUsuarios([3]),
  validarId("id_obra_social"),
  validarCampos,
  obrasSocialesControlador.desactivarObraSocial,
);

export { router };

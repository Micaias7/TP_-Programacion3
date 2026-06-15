import express from 'express';
import apicache from 'apicache';
import EspecialidadesControlador from "../../controladores/especialidadesControlador.js";
import { validarId } from "../../middlewares/validarId.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { validacionEspecialidades } from "../../middlewares/validacionesEspecialidades.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = express.Router();

const cache = apicache.middleware;

const especialidadesControlador = new EspecialidadesControlador();

/**
 * @swagger
 * /api/v1/especialidades:
 *   get:
 *     summary: Obtener todas las especialidades
 *     tags:
 *       - Especialidades
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de especialidades
 *       500:
 *         description: Error interno
 */

router.get(
  "/",
  autorizarUsuarios([2, 3]),
  cache("5 minutes"),
  especialidadesControlador.buscarTodas,
);

/**
 * @swagger
 * /api/v1/especialidades/{id_especialidad}:
 *   get:
 *     summary: Obtener especialidad por ID
 *     tags:
 *       - Especialidades
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
 *         description: Especialidad encontrada
 *       404:
 *         description: Especialidad no encontrada
 *       500:
 *         description: Error interno
 */

router.get(
  "/:id_especialidad",
  autorizarUsuarios([3]),
  validarId("id_especialidad"),
  validarCampos,
  especialidadesControlador.buscarPorId,
);

/**
 * @swagger
 * /api/v1/especialidades:
 *   post:
 *     summary: Crear una especialidad
 *     tags:
 *       - Especialidades
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
 *                 example: CARDIOLOGÍA
 *     responses:
 *       201:
 *         description: Especialidad creada
 *       500:
 *         description: Error interno
 */

router.post(
  "/",
  autorizarUsuarios([3]),
  validacionEspecialidades,
  validarCampos,
  especialidadesControlador.crearEspecialidad,
);

/**
 * @swagger
 * /api/v1/especialidades/{id_especialidad}:
 *   put:
 *     summary: Editar una especialidad
 *     tags:
 *       - Especialidades
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especialidad
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
 *                 example: CARDIOLOGÍA
 *     responses:
 *       200:
 *         description: Especialidad modificada
 *       404:
 *         description: Especialidad no encontrada
 *       500:
 *         description: Error interno
 */

router.put(
  "/:id_especialidad",
  autorizarUsuarios([3]),
  validarId("id_especialidad"),
  validacionEspecialidades,
  validarCampos,
  especialidadesControlador.editarEspecialidad,
);

/**
 * @swagger
 * /api/v1/especialidades/{id_especialidad}:
 *   delete:
 *     summary: Eliminar una especialidad
 *     tags:
 *       - Especialidades
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
 *         description: Especialidad eliminada
 *       404:
 *         description: Especialidad no encontrada
 *       500:
 *         description: Error interno
 */

router.delete(
  "/:id_especialidad",
  autorizarUsuarios([3]),
  validarId("id_especialidad"),
  validarCampos,
  especialidadesControlador.eliminarEspecialidad,
);

export { router };

import express from "express";
import { check, param } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { validarId } from "../../middlewares/validarId.js";
import TurnosReservasControlador from "../../controladores/turnosReservasControlador.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = express.Router();
const turnosReservasControlador = new TurnosReservasControlador();

/**
 * @swagger
 * /api/v1/turnos-reservas:
 *   get:
 *     summary: Obtener turnos del usuario autenticado
 *     description: |
 *       Devuelve los turnos asociados al usuario autenticado.
 *
 *       - Si el usuario tiene rol Médico (1), devuelve los turnos asignados a ese médico.
 *       - Si el usuario tiene rol Paciente (2), devuelve los turnos reservados por ese paciente.
 *     tags:
 *       - Turnos Reservas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Turnos encontrados
 *         content:
 *           application/json:
 *             example:
 *               estado: true
 *               mensaje: Turnos encontrados.
 *               turnos:
 *                 - id_turno_reserva: 1
 *                   id_medico: 1
 *                   id_paciente: 2
 *                   fecha_hora: "2026-09-01 17:00:00"
 *                   valor_total: 4500
 *                   atendido: 0
 *                   activo: 1
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: Usuario sin permisos para acceder al recurso
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', autorizarUsuarios([1, 2]), turnosReservasControlador.buscarTodos);

/**
 * @swagger
 * /api/v1/turnos-reservas:
 *   post:
 *     summary: Crear un turno
 *     tags:
 *       - Turnos Reservas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_medico:
 *                 type: integer
 *                 example: 1
 *               id_paciente:
 *                 type: integer
 *                 example: 1
 *               fecha_hora:
 *                 type: string
 *                 example: 2026-06-15 10:00:00
 *     responses:
 *       201:
 *         description: Turno creado
 *       400:
 *         description: No se pudo crear el turno
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
  [
    check("id_medico").notEmpty().withMessage("El id_medico es obligatorio."),
    check("id_paciente").notEmpty().withMessage("El id_paciente es obligatorio."),
    check("fecha_hora").notEmpty().withMessage("La fecha_hora es obligatoria."),
    validarCampos,
  ],
  turnosReservasControlador.crear,
);

/**
 * @swagger
 * /api/v1/turnos-reservas/{id}:
 *   put:
 *     summary: Modificar fecha y hora de un turno
 *     tags:
 *       - Turnos Reservas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del turno a modificar
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha_hora
 *             properties:
 *               fecha_hora:
 *                 type: string
 *                 example: "2026-06-20 15:30:00"
 *     responses:
 *       200:
 *         description: Fecha del turno actualizada correctamente
 *         content:
 *           application/json:
 *             example:
 *               estado: true
 *               mensaje: Fecha del turno actualizada con éxito.
 *               id: 1
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
 *         description: Turno no encontrado
 *         content:
 *           application/json:
 *             example:
 *               estado: false
 *               mensaje: Turno no encontrado.
 *       500:
 *         description: Error interno
 */

router.put(
  "/:id",
  autorizarUsuarios([3]),
  validarId("id"),
  [
    check("fecha_hora").notEmpty().withMessage("La fecha_hora es obligatoria."),
    validarCampos,
  ],
  turnosReservasControlador.modificarFecha,
);

/**
 * @swagger
 * /api/v1/turnos-reservas/medico/{id_turno_reserva}:
 *   put:
 *     summary: Marcar turno como atendido
 *     tags:
 *       - Turnos Reservas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_turno_reserva
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turno marcado como atendido
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
 *         description: Turno no encontrado o no pertenece al médico logueado
 *       500:
 *         description: Error interno
 */

router.put(
  '/medico/:id_turno_reserva',
  autorizarUsuarios([1]),
  [
    param('id_turno_reserva', 'El id_turno_reserva debe ser un número').isInt({ min: 1 }),
    validarCampos,
  ], turnosReservasControlador.marcarAtendido,
);

/**
 * @swagger
 * /api/v1/turnos-reservas/{id}:
 *   delete:
 *     summary: Desactivar un turno
 *     tags:
 *       - Turnos Reservas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del turno a desactivar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Turno desactivado correctamente
 *         content:
 *           application/json:
 *             example:
 *               estado: true
 *               mensaje: Turno desactivado con éxito.
 *               id: 1
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
 *         description: Turno no encontrado
 *         content:
 *           application/json:
 *             example:
 *               estado: false
 *               mensaje: Turno no encontrado.
 *       500:
 *         description: Error interno
 */

router.delete(
  "/:id",
  autorizarUsuarios([3]),
  validarId("id"),
  validarCampos,
  turnosReservasControlador.desactivarTurno,
);

export { router };

import express from "express";
import { check, param } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";

import TurnosReservasControlador from "../../controladores/turnosReservasControlador.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = express.Router();

const turnosReservasControlador = new TurnosReservasControlador();

/**
 * @swagger
 * /api/v1/turnos-reservas:
 *   get:
 *     summary: Obtener todos los turnos
 *     tags:
 *       - Turnos Reservas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos
 *       500:
 *         description: Error interno
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
 *       500:
 *         description: Error interno
 */

router.post(
  "/",
  autorizarUsuarios([3]),
  [
    check("id_medico").notEmpty().withMessage("El id_medico es obligatorio."),
    check("id_paciente")
      .notEmpty()
      .withMessage("El id_paciente es obligatorio."),
    check("fecha_hora").notEmpty().withMessage("La fecha_hora es obligatoria."),
    validarCampos,
  ],
  turnosReservasControlador.crear,
);

/**
 * @swagger
 * /api/v1/turnos-reservas/{id_turno_reserva}:
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
 *       404:
 *         description: Turno no encontrado o no pertenece al médico logueado
 *       500:
 *         description: Error interno
 */

router.put(
  '/:id_turno_reserva',
  autorizarUsuarios([1]),
  [
    param('id_turno_reserva', 'El id_turno_reserva debe ser un número').isInt({ min: 1 }),
    validarCampos,
  ], turnosReservasControlador.marcarAtendido,
);

export { router };

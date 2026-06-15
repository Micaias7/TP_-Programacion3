import express from "express";
import { check, param } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { validarId } from "../../middlewares/validarId.js";
import TurnosReservasControlador from "../../controladores/turnosReservasControlador.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = express.Router();
const turnosReservasControlador = new TurnosReservasControlador();

router.get('/', autorizarUsuarios([1, 2]), turnosReservasControlador.buscarTodos);

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

router.post(
  "/mis-turnos",
  autorizarUsuarios([2]),
  [
    check("id_medico").notEmpty().withMessage("El id_medico es obligatorio."),
    check("fecha_hora").notEmpty().withMessage("La fecha_hora es obligatoria."),
    validarCampos,
  ],
  turnosReservasControlador.crearTurnoPropio
);

router.delete(
  "/:id",
  autorizarUsuarios([3]),
  validarId("id"),
  validarCampos,
  turnosReservasControlador.desactivarTurno,
);

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
 * /api/v1/turnos-reservas/{id_turno_reserva}:
 *   put:
 *     summary: Marcar turno como atendido
 *     description: Permite a un médico logueado marcar un turno como atendido. Solo puede marcar sus propios turnos.
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
 *         description: ID del turno a marcar como atendido
 *     responses:
 *       200:
 *         description: Turno marcado como atendido
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
 *                   example: Turno marcado como atendido.
 *       403:
 *         description: Acceso denegado
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

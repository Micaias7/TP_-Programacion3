import express from 'express';
import { param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import ObrasSocialesControlador from '../../controladores/obrasSocialesControlador.js';

const router = express.Router();

const obrasSocialesControlador = new ObrasSocialesControlador();

router.get('/', obrasSocialesControlador.buscarTodas);

router.get('/:id_obra_social',
  [
    param('id_obra_social', 'El parámetro debe ser numérico').isInt({ min: 1 }),
    validarCampos
  ],
  obrasSocialesControlador.buscarPorId
);

export { router };

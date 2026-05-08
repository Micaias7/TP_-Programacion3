import express from 'express';
import ObrasSocialesControlador from '../../controladores/obrasSocialesControlador.js';

const router = express.Router();

const obrasSocialesControlador = new ObrasSocialesControlador();

router.post('/', obrasSocialesControlador.crearObraSocial);

export { router };
import express from "express";
import MedicosControlador from "../../controladores/medicosControlador.js";

const router = express.Router();

const medicosControlador = new MedicosControlador();

router.get ("/", medicosControlador.buscarTodos );

router.get ("/:id_medico", medicosControlador.buscarPorId);

router.post ("/", medicosControlador.crearMedico);

router.put ("/:id_medico",  medicosControlador.editarMedico);

router.delete ("/:id_medico", medicosControlador.eliminarMedico);

export {router};

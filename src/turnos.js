import express from "express";
import morgan from "morgan";
import fs from "fs";

import { testConexion } from "./db/test_conexion.js";
import { router as v1EspecialidadesRutas } from "./rutas/v1/especialidadesRutas.js";
import { router as v1ObrasSocialesRutas } from "./rutas/v1/obrasSocialesRutas.js";
import { router as v1MedicosRutas } from "./rutas/v1/medicosRutas.js";
// import { check, param } from "express-validator";
// import { validarCampos } from "./middlewares/validarCampos.js";

const app = express();

await testConexion();

let log = fs.createWriteStream('./accesos.log', { 
    flags: 'a'
});

app.use(morgan('tiny'));
app.use(morgan('combined', {stream: log}));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ estado: "ok", msg: "API OK" });
});

app.use("/api/v1/especialidades", v1EspecialidadesRutas);
app.use("/api/v1/obras-sociales", v1ObrasSocialesRutas);
app.use("/api/v1/medicos", v1MedicosRutas);


export default app;
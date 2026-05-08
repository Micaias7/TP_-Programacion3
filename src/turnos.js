import express from "express";
import { testConexion } from "./db/test_conexion.js";
import { router as v1EspecialidadesRutas } from "./rutas/v1/especialidadesRutas.js";
import { router as v1ObrasSocialesRutas } from './rutas/v1/obrasSocialesRutas.js';
const app = express();

await testConexion();

app.use(express.json());

app.get('/', (req, res) => {
  // console.log("test get");
  res.status(200).send({'estado':'ok', 'msg':'API OK'});  
});

app.use('/api/v1/especialidades', v1EspecialidadesRutas);
app.use('/api/v1/obras-sociales', v1ObrasSocialesRutas);

process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
  console.log(`servidor iniciado OK en puerto ${PUERTO}`);
});
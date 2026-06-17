import express from "express";
import morgan from "morgan";
import fs from "fs";
import passport from "passport";
import cors from "cors";
import multer from "multer";
import path from "path";
import { specs, swaggerUi } from "./config/swagger.js";

// IMPORTAMOS LA ESTRATEGIA A USAR Y LA FORMA DE VALIDAR.
import { estrategia, validacion } from "./config/passport.js";

import { testConexion } from "./db/test_conexion.js";
import { ejecutarMigraciones } from "./db/migraciones.js";
import { router as v1EspecialidadesRutas } from "./rutas/v1/especialidadesRutas.js";
import { router as v1ObrasSocialesRutas } from "./rutas/v1/obrasSocialesRutas.js";
import { router as v1MedicosRutas } from "./rutas/v1/medicosRutas.js";
import { router as v1TurnosReservas } from "./rutas/v1/turnosReservasRutas.js";
import { router as v1AuthRutas } from "./rutas/v1/authRutas.js";
import { log } from "./middlewares/multerConfig.js";
import { router as v1UsuariosRutas } from "./rutas/v1/usuariosRutas.js";
// import { check, param } from "express-validator";
// import { validarCampos } from "./middlewares/validarCampos.js";

const app = express();
await testConexion();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
await ejecutarMigraciones();
// CONFIGURACION PASSPORT
passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());
app.use(morgan("tiny"));
app.use(morgan("combined", { stream: log }));

app.get("/", (req, res) => {
  res.status(200).send({ estado: "ok", msg: "API OK" });
});

app.use(
  "/api/v1/especialidades",
  passport.authenticate("jwt", { session: false }),
  v1EspecialidadesRutas,
);
app.use(
  "/api/v1/obras-sociales",
  passport.authenticate("jwt", { session: false }),
  v1ObrasSocialesRutas,
);
app.use(
  "/api/v1/medicos",
  passport.authenticate("jwt", { session: false }),
  v1MedicosRutas,
);
app.use(
  "/api/v1/turnos-reservas",
  passport.authenticate("jwt", { session: false }),
  v1TurnosReservas,
);

app.use("/api/v1/usuarios",  
  passport.authenticate("jwt", { session: false }),
  v1UsuariosRutas,
);

app.use("/api/v1/auth", v1AuthRutas);

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(specs));

export default app;

const express = require("express");
const morgan = require("morgan");

const cors = require("cors");

const generalRoutes = require("./routes/general.routes");
const estudianteRoutes = require("./routes/estudiantes.routes");
const loginRoutes = require("./routes/login.routes");
const inventarioRoutes = require("./routes/inventario.routes");
const docenteRoutes = require("./routes/docente.routes");
const observacionRoutes = require("./routes/observacion.routes");
const horarioRoutes = require("./routes/horario.routes");
const asistenciaRoutes = require("./routes/asistencia.routes");
const controlRoutes = require("./routes/control.routes");
const gradoRoutes = require("./routes/grado.routes");
const asignaturaRoutes = require("./routes/asignatura.routes");
const permisoRoutes = require("./routes/permisos.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(generalRoutes);
app.use(loginRoutes);
app.use(estudianteRoutes);
app.use(docenteRoutes);
app.use(inventarioRoutes);
app.use(observacionRoutes);
app.use(horarioRoutes);
app.use(asistenciaRoutes);
app.use(controlRoutes);
app.use(gradoRoutes);
app.use(asignaturaRoutes);
app.use(permisoRoutes);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(4000);
console.log("Server on port 4000");

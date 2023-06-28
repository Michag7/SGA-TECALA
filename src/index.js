const express = require("express");
const morgan = require("morgan");

const cors = require("cors");

const estudianteRoutes = require("./routes/estudiantes.routes");
const loginRoutes = require("./routes/login.routes");
const inventarioRoutes = require("./routes/inventario.routes");
const docenteRoutes = require("./routes/docente.routes");
const observacionRoutes = require("./routes/observacion.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(loginRoutes);
app.use(estudianteRoutes);
app.use(docenteRoutes);
app.use(inventarioRoutes);
app.use(observacionRoutes);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(4000);
console.log("Server on port 4000");

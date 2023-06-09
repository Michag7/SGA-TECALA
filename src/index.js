const express = require("express");
const morgan = require("morgan");

const cors = require("cors");

const estudianteRoutes = require("./routes/estudiantes.routes");
const loginRoutes = require("./routes/login.routes");
const inventarioRoutes = require("./routes/inventario.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(estudianteRoutes);
app.use(loginRoutes);
app.use(inventarioRoutes);

app.listen(4000);
console.log("Server on port 4000");

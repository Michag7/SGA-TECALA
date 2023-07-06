const { Router } = require("express");
const {
  getControlAsistenciaAsignatura,
  getAsistencias,
  postAsistencias,
  updateAsistencias,
  getEstudiantesInasistentes,
  getMesesAsignatura,
  getAsistenciasAsignaturaMes,
  getAsistenciasAsignaturaPeriodo,
  getPeriodosAsignatura,
  getAsistenciasEstudianteAsignaturaPeriodo,
  getPeriodosAsistenciasEstudiante,
} = require("../controllers/asistencia.controller");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/asistencias", authenticateToken, postAsistencias);

//Ruta que obtiene las asistencias de un estudiante a una asignatura en un periodo determinado
router.get(
  "/asistenciasestudianteasignaturaperiodo/:eid/:aid/:pid",
  authenticateToken,
  getAsistenciasEstudianteAsignaturaPeriodo
);

//Ruta que obtiene los periodos en los cuales el estudiante tiene asistencias
router.get(
  "/periodosasistenciasestudiante/:eid",
  authenticateToken,
  getPeriodosAsistenciasEstudiante
);
router.get(
  "/asistenciasasignaturaperiodo/:aid/:pid",
  authenticateToken,
  getAsistenciasAsignaturaPeriodo
);
router.get(
  "/asistenciasasignaturames/:aid/:mes",
  authenticateToken,
  getAsistenciasAsignaturaMes
);
router.get(
  "/asistenciasAsignatura/:control/:asignatura",
  authenticateToken,
  getControlAsistenciaAsignatura
);
router.get("/asistencias/:control", authenticateToken, getAsistencias);
router.get("/mesesasistencia/:aid", authenticateToken, getMesesAsignatura);
router.get(
  "/periodosasistencia/:aid",
  authenticateToken,
  getPeriodosAsignatura
);
router.get(
  "/asistenciasE/:control",
  authenticateToken,
  getEstudiantesInasistentes
);
router.put("/asistencias/", authenticateToken, updateAsistencias);
// router.delete("/inventario/:id", authenticateToken, deleteInventario);

// Middleware para verificar y decodificar el token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: err.message });
    }

    req.user = user;
    next();
  });
}

module.exports = router;

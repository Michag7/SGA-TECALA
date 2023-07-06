const { Router } = require("express");
const {
  postAsignatura,
  getAsignaturasDocente,
  getAsignaturasDocenteGrado,
  getAsignaturasGrado,
  updateAsignatura,
  deleteAsignatura,
} = require("../controllers/asignatura.controller");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/asignatura", authenticateToken, postAsignatura);
router.get("/asignaturas/:did", authenticateToken, getAsignaturasDocente);
router.get("/asignaturasG/:gid", authenticateToken, getAsignaturasGrado);
router.get(
  "/asignaturas/:did/:gid",
  authenticateToken,
  getAsignaturasDocenteGrado
);
router.put("/asignatura/", authenticateToken, updateAsignatura);
router.delete("/asignatura/:aid", authenticateToken, deleteAsignatura);

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

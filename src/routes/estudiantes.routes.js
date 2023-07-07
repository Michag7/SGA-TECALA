const { Router } = require("express");
const {
  getListaEstudiantes,
  getEstudiante,
  deleteEstudiante,
  postEstudiante,
  updateEstudiante,
  promocionEstudiantes,
  promocionTodosEstudiantesGrado,
} = require("../controllers/estudiantes.controller");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const upload = multer().single("image");

const router = Router();

router.post("/estudiante", authenticateToken, upload, postEstudiante);
router.get("/listaestudiantes/:gid", authenticateToken, getListaEstudiantes);
router.get("/estudiante/:id", authenticateToken, getEstudiante);
router.put("/estudiante/:id", authenticateToken, updateEstudiante);
router.put("/promociones/:gid/:gidp", authenticateToken, promocionEstudiantes);
router.put(
  "/promocionesall/",
  authenticateToken,
  promocionTodosEstudiantesGrado
);

router.delete("/estudiante/:id", authenticateToken, deleteEstudiante);

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

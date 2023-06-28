const { Router } = require("express");
const {
  getEstudiante,
  getListaEstudiantes,
} = require("../controllers/estudiantes.controller");
const jwt = require("jsonwebtoken");

const router = Router();

router.get("/estudiante", getEstudiante);
router.get("/listaestudiantes/:id", authenticateToken, getListaEstudiantes);

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

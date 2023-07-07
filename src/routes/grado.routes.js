const { Router } = require("express");
const {
  getGrados,
  getDocenteGrado,
  updateDocenteGrado,
} = require("../controllers/grado.controller");
const jwt = require("jsonwebtoken");

const router = Router();

// router.post("/control", authenticateToken, post);
router.get("/grados", authenticateToken, getGrados);
router.get("/docentegrado/:gid", authenticateToken, getDocenteGrado);
router.put("/docentegrado", authenticateToken, updateDocenteGrado);

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

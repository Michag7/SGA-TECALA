const { Router } = require("express");
const {
  postControl,
  getControl,
  getControlesAño,
  getControlGradoMes,
  getControlFecha,
} = require("../controllers/control.controller");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/control", authenticateToken, postControl);
router.get("/control/:cid", authenticateToken, getControl);
router.get("/control/:grado/:fecha", authenticateToken, getControlFecha);
router.get("/controles/:ano", authenticateToken, getControlesAño);
router.get("/controles/:grado/:mes", authenticateToken, getControlGradoMes);

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

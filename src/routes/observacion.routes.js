const { Router } = require("express");
const {
  postObservacion,
  getControlObservaciones,
  updateObservacion,
} = require("../controllers/observacion.controller");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/observacion", authenticateToken, postObservacion);
router.get("/observaciones/:id", authenticateToken, getControlObservaciones);
router.put("/observacion", authenticateToken, updateObservacion);
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

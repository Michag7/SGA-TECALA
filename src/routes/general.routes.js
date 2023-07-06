const { Router } = require("express");
const {
  getUsuario,
  updateCuenta,
} = require("../controllers/general.controller");
const jwt = require("jsonwebtoken");

const router = Router();

router.get("/usuario/:id", getUsuario);
router.put("/cuenta", authenticateToken, updateCuenta);

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

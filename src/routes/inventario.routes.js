const { Router } = require("express");
const {
  getInventario,
  postInventario,
  deleteInventario,
  updateInventario,
} = require("../controllers/inventario.controller");
const jwt = require("jsonwebtoken");

const router = Router();

router.get("/inventario/:id", authenticateToken, getInventario);
router.post("/inventario", authenticateToken, postInventario);
router.delete("/inventario/:id", authenticateToken, deleteInventario);
router.put("/inventario/:id", authenticateToken, updateInventario);

// Middleware para verificar y decodificar el token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, "K34sVcc6GMASMG4BlpdP", (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

module.exports = router;

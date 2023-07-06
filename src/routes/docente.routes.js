const { Router } = require("express");
const {
  postDocente,
  getDocentes,
  deleteDocente,
  updateDocente,
} = require("../controllers/docente.controller");
const jwt = require("jsonwebtoken");
const router = Router();
const multer = require("multer");
const upload = multer().single("image");

router.post("/docente", authenticateToken, upload, postDocente);
router.get("/docentes", authenticateToken, getDocentes);
router.delete("/docente/:id", authenticateToken, deleteDocente);
router.put("/docente/:id", authenticateToken, updateDocente);

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
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

module.exports = router;

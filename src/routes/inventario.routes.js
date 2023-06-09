const { Router } = require("express");
const {
  getInventario,
  postInventario,
  deleteInventario,
  updateInventario,
} = require("../controllers/inventario.controller");

const router = Router();

router.get("/inventario/:id", getInventario);
router.post("/inventario", postInventario);
router.delete("/inventario/:id", deleteInventario);
router.put("/inventario/:id", updateInventario);

module.exports = router;

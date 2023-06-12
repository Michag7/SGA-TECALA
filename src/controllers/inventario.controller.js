const pool = require("../bd");

const postInventario = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO inventario (articulo_nombre, articulo_marca, articulo_estado, articulo_descripcion, sid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        req.body.nombre,
        req.body.marca,
        req.body.estado,
        req.body.descripcion,
        req.body.seccion,
      ]
    );


    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const getInventario = async (req, res) => {
  try {
    const seccion = req.params.id;

    const result = await pool.query("SELECT * FROM inventario where SID = $1", [
      seccion,
    ]);

    // if (result.rowCount == 0) {
    //   res.status(404).json({ message: "Articulo no encontrado" });
    // }

    res.send(result.rows);
  } catch (error) {
    next(error);
  }
};

const deleteInventario = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query("DELETE FROM inventario where iid = $1", [
      id,
    ]);

    if (result.rowCount == 0) {
      res.status(404).json({ message: "Articulo no encontrado" });
    }

    res.json({ message: "Articulo elminado" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updateInventario = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "UPDATE inventario SET articulo_nombre = $1, articulo_marca = $2, articulo_estado = $3, articulo_descripcion  = $4 WHERE iid = $5 RETURNING *",
      [
        req.body.nombre,
        req.body.marca,
        req.body.estado,
        req.body.descripcion,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInventario,
  postInventario,
  deleteInventario,
  updateInventario,
};

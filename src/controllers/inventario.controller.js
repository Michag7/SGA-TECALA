const pool = require("../bd");

const postInventario = async (req, res) => {
  try {
    const result = await pool.query(
      `INSERT INTO inventario (articulo_nombre, articulo_marca, articulo_estado, articulo_descripcion, sid) 
      VALUES ('${req.body.nombre}', '${req.body.marca}', '${req.body.estado}', '${req.body.descripcion}', ${req.body.seccion}) RETURNING *`
    );

    if (result.rows.length == 0) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    if (result.rows.length > 0) {
      return res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
  }
};

const getInventario = async (req, res) => {
  try {
    const seccion = req.params.id;

    const result = await pool.query(
      `SELECT * FROM inventario where SID = ${seccion}`
    );

    res.send(result.rows);
  } catch (error) {
    console.error(error);
  }
};

const deleteInventario = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(`DELETE FROM inventario where iid = ${id}`);

    console.log(result.rowCount);
    if (result.rowCount == 1) {
      res.json({ message: "Articulo elminado" });
    }

    if (result.rowCount == 0) {
      res.status(404).json({ message: "Articulo no encontrado" });
    }
  } catch (error) {
    console.error(error);
  }
};

const updateInventario = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      `UPDATE inventario SET articulo_nombre = '${req.body.nombre}', articulo_marca = '${req.body.marca}', articulo_estado = '${req.body.estado}', articulo_descripcion  = '${req.body.descripcion}' 
      WHERE iid = ${id} RETURNING *`
    );

    if (result.rows.length == 0) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    if (result.rows.length > 0) {
      return res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getInventario,
  postInventario,
  deleteInventario,
  updateInventario,
};

const pool = require("../bd");

const postObservacion = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO observacion (o_hora, o_tema, cid, docente) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.body.hora, req.body.tema, req.body.control, req.body.docente]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const getControlObservaciones = async (req, res) => {
  try {
    const control = req.params.id;

    const result = await pool.query(
      "SELECT * FROM observacion where cid = $1",
      [control]
    );

    // if (result.rowCount == 0) {
    //   res.status(404).json({ message: "Articulo no encontrado" });
    // }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

// const deleteInventario = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const result = await pool.query("DELETE FROM inventario where iid = $1", [
//       id,
//     ]);

//     if (result.rowCount == 0) {
//       res.status(404).json({ message: "Articulo no encontrado" });
//     }

//     res.json({ message: "Articulo elminado" });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

const updateObservacion = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE observacion SET o_tema = $1 WHERE oid = $2 RETURNING *",
      [req.body.tema, req.body.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postObservacion,
  getControlObservaciones,
  updateObservacion
};

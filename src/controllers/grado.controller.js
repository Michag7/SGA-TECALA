const pool = require("../bd");

// const postControl = async (req, res) => {
//   try {
//     const control = req.body;

//     const result = await pool.query(
//       "INSERT INTO control(c_fecha, gid)VALUES ($1, $2)  RETURNING *",
//       [control.c_fecha, control.gid]
//     );

//     if (result.rowCount === 0) {
//       return res.json({ message: "Datos no insertados" });
//     }

//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.log(error);
//   }
// };

const getGrados = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM grado");

    if (result.rowCount == 0) {
      return res.json({ message: "Datos no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getGrados };

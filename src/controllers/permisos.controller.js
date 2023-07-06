const pool = require("../bd");

// const postAsignatura = async (req, res) => {
//   try {
//     const asignatura = req.body;

//     const result = await pool.query(
//       "INSERT INTO asignatura(aid, a_nombre, gid, did)VALUES ($1, $2, $3, $4)  RETURNING *",
//       [asignatura.aid, asignatura.a_nombre, asignatura.gid, asignatura.did]
//     );

//     if (result.rowCount === 0) {
//       return res.json({ message: "Datos no insertados" });
//     }

//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.log(error);
//   }
// };

const getPermisos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM permiso");

    if (result.rowCount == 0) {
      return res.json({ message: "Permisos no encontrados" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getPermisosEstudiante = async (req, res) => {
  try {
    const cuenta_id = req.params.cuenta_id;

    const result = await pool.query(
      "SELECT * FROM cuentapermiso WHERE cuenta_id = $1",
      [cuenta_id]
    );

    if (result.rowCount === 0) {
      return res.json({ message: "El estudiante no tiene permisos" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPermisos,
  getPermisosEstudiante,
};

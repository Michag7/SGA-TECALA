const pool = require("../bd");

const getEstudiante = async (req, res) => {
  const stu = await pool.query("SELECT * FROM administrador");
  console.log(stu);
  res.send("estudiante");
};

const getListaEstudiantes = async (req, res) => {
  try {
    const grado = req.params.id;

    const result = await pool.query("SELECT * FROM estudiante where gid = $1", [
      grado,
    ]);

    // if (result.rowCount == 0) {
    //   res.status(404).json({ message: "Articulo no encontrado" });
    // }

    console.log(result.rows);

    res.send(result.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEstudiante,
  getListaEstudiantes,
};

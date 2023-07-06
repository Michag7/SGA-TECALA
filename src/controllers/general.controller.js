const pool = require("../bd");

const getUsuario = async (req, res) => {
  try {
    const id = req.params.id;

    const resultA = await pool.query(
      "SELECT 'Administrador' as rol, id, nombre, apellido, foto FROM administrador WHERE id = $1",
      [id]
    );

    const resultD = await pool.query(
      "SELECT 'Docente' as rol, id, nombre, apellido, foto  FROM docente WHERE id = $1",
      [id]
    );

    const resultE = await pool.query(
      "SELECT 'Estudiante' as rol, id, nombre, apellido, foto, gid FROM estudiante WHERE id = $1",
      [id]
    );

    if (resultA.rowCount === 1) {
      const user = resultA.rows[0];
      const foto = user.foto.toString("base64");
      const response = { user, foto };
      return res.json(response);
    }

    if (resultD.rowCount === 1) {
      const user = resultD.rows[0];
      const foto = user.foto.toString("base64");
      const response = { user, foto };
      return res.json(response);
    }

    if (resultE.rowCount === 1) {
      const user = resultE.rows[0];
      const foto = user.foto.toString("base64");
      const response = { user, foto };
      return res.json(response);
    }
    if (
      resultA.rowCount === 0 &&
      resultD.rowCount === 0 &&
      resultE.rowCount === 0
    ) {
      return res.json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getCuenta = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query("SELECT * FROM cuenta WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.json({ message: "Cuenta no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

const updateCuenta = async (req, res) => {
  try {
    const cuenta = req.body;

    const result = await pool.query(
      "UPDATE cuenta SET contraseña = $1 WHERE cuenta_id = $2",
      [cuenta.contraseña, cuenta.id]
    );

    if (result.rowCount === 0) {
      return res.json({ message: "Cuenta no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getUsuario,
  getCuenta,
  updateCuenta,
};

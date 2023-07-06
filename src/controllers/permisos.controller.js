const pool = require("../bd");

const postCuentaPermiso = async (req, res) => {
  try {
    const permiso = req.body;

    const result = await pool.query(
      "INSERT INTO cuentapermiso (permiso_id, cuenta_id) VALUES ($1, $2)  RETURNING *",
      [permiso.permiso_id, permiso.cuenta_id]
    );

    if (result.rowCount === 0) {
      return res.json({ message: "Permiso no asignado" });
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

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
      "SELECT id, fecha_creacion, cuentapermiso.permiso_id, permiso_nombre, cuenta_id FROM cuentapermiso JOIN permiso ON cuentapermiso.permiso_id = permiso.permiso_id WHERE cuenta_id = $1",
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

const deleteCuentaPermiso = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query("DELETE FROM cuentapermiso WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0) {
      return res.json({ message: "Permiso no encontrado" });
    }

    res.json({ message: "Permiso eliminado" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPermisos,
  getPermisosEstudiante,
  deleteCuentaPermiso,
  postCuentaPermiso,
};

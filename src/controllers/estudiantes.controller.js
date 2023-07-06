const pool = require("../bd");

const postEstudiante = async (req, res) => {
  const client = await pool.connect();
  try {
    const image = req.file.buffer;
    const estudiante = JSON.parse(req.body.estudiante);

    console.log(image);
    console.log(estudiante);

    await client.query("BEGIN");

    const resultC = await client.query(
      "INSERT INTO cuenta (usuario, contraseña) VALUES ($1, $2) RETURNING *;",
      [estudiante.id, estudiante.contraseña]
    );

    console.log(resultC.rows[0].cuenta_id);
    const resultD = await client.query(
      `INSERT INTO estudiante(
              id, foto, nombre, apellido, genero, telefono, email, barrio, direccion, gid, cuentaid)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
      [
        estudiante.id,
        image,
        estudiante.nombres,
        estudiante.apellidos,
        estudiante.genero,
        estudiante.telefono,
        estudiante.correo,
        estudiante.barrio,
        estudiante.direccion,
        estudiante.gid,
        resultC.rows[0].cuenta_id,
      ]
    );

    if (resultC.rowCount && resultD.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.json({ message: "Estudiante no creado" });
    }

    await client.query("COMMIT");

    res.status(201).json({ message: "Estudiante creado" });
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getListaEstudiantes = async (req, res) => {
  try {
    const grado = req.params.gid;

    const result = await pool.query(
      "SELECT * FROM estudiante JOIN cuenta ON estudiante.cuentaid = cuenta.cuenta_id WHERE gid = $1",
      [grado]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Estudiantes no encontrados" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getEstudiante = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query("SELECT * FROM estudiante WHERE id = $1", [
      id,
    ]);

    if (result.rowCount == 0) {
      return res.json({ message: "Estudiante no encontrado" });
    }

    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const updateEstudiante = async (req, res) => {
  try {
    const id = req.params.id;
    const estudiante = req.body;

    const result = await pool.query(
      "UPDATE estudiante SET nombre = $1, apellido = $2, genero = $3, telefono  = $4, email = $5, barrio = $6, direccion = $7  WHERE id = $8 RETURNING *;",
      [
        estudiante.nombres,
        estudiante.apellidos,
        estudiante.genero,
        estudiante.telefono,
        estudiante.correo,
        estudiante.barrio,
        estudiante.direccion,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.json({ message: "Datos no actualizados" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteEstudiante = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "DELETE FROM estudiante WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Estudiante no encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getEstudiante,
  getListaEstudiantes,
  deleteEstudiante,
  postEstudiante,
  updateEstudiante,
};

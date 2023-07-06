const pool = require("../bd");

const postDocente = async (req, res) => {
  const client = await pool.connect();
  try {
    const image = req.file.buffer;
    const docente = JSON.parse(req.body.docente);

    await client.query("BEGIN");
    await client.query("SAVEPOINT sp");

    const resultC = await client.query(
      "INSERT INTO cuenta (usuario, contraseña) VALUES ($1, $2) RETURNING *;",
      [docente.username, docente.password]
    );

    console.log(resultC.rows[0].cuenta_id);
    const resultD = await client.query(
      `INSERT INTO docente(
              id, foto, nombre, apellido, genero, telefono, email, ciudad, barrio, direccion, cuentaid)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
      [
        docente.id,
        image,
        docente.nombres,
        docente.apellidos,
        docente.genero,
        docente.telefono,
        docente.correo,
        docente.ciudad,
        docente.barrio,
        docente.direccion,
        resultC.rows[0].cuenta_id,
      ]
    );

    await client.query("RELEASE SAVEPOINT sp");
    await client.query("COMMIT");

    if (resultC.rowCount && resultD.rowCount === 0) {
      return res.json({ message: "Docente no creado" });
    }

    res.status(201).json({message: "Docente creado"});
  } catch (error) {
    await client.query("ROLLBACK TO SAVEPOINT sp");
    throw error;
  } finally {
    client.release();
  }
};

const getDocentes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM docente JOIN cuenta ON docente.cuentaid = cuenta.cuenta_id");

    res.send(result.rows);
  } catch (error) {
    console.error(error);
  }
};

const deleteDocente = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query("DELETE FROM docente where id = $1", [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Articulo no encontrado" });
    }

    res.json({ message: "Articulo elminado" });
  } catch (error) {
    next(error);
  }
};

const updateDocente = async (req, res) => {
  try {
    const id = req.params.id;
    const docente = req.body;

    const result = await pool.query(
      "UPDATE docente SET nombre = $1, apellido = $2, genero = $3, telefono  = $4, email = $5, ciudad = $6, barrio = $7, direccion = $8  WHERE id = $9 RETURNING *;",
      [
        docente.nombres,
        docente.apellidos,
        docente.genero,
        docente.telefono,
        docente.correo,
        docente.ciudad,
        docente.barrio,
        docente.direccion,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Datos no actualizados" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const getDocente = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("SELECT * FROM docente WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Docente no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  postDocente,
  getDocentes,
  deleteDocente,
  updateDocente,
};

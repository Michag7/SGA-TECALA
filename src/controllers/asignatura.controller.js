const pool = require("../bd");

const postAsignatura = async (req, res) => {
  try {
    const asignatura = req.body;

    const result = await pool.query(
      "INSERT INTO asignatura(aid, a_nombre, gid, did)VALUES ($1, $2, $3, $4)  RETURNING *",
      [asignatura.aid, asignatura.a_nombre, asignatura.gid, asignatura.did]
    );

    if (result.rowCount === 0) {
      return res.json({ message: "Datos no insertados" });
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const getAsignaturasDocente = async (req, res) => {
  try {
    const did = req.params.did;

    const result = await pool.query("SELECT * FROM asignatura WHERE did = $1", [
      did,
    ]);

    if (result.rowCount == 0) {
      return res.json({ message: "Datos no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getAsignaturasGrado = async (req, res) => {
  try {
    const gid = req.params.gid;

    const result = await pool.query("SELECT * FROM asignatura WHERE gid = $1", [
      gid,
    ]);

    if (result.rowCount == 0) {
      return res.json({ message: "Datos no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getAsignaturasDocenteGrado = async (req, res) => {
  try {
    const did = req.params.did;
    const gid = req.params.gid;

    const result = await pool.query(
      "SELECT * FROM asignatura WHERE did = $1 AND gid = $2",
      [did, gid]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Datos no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const updateAsignatura = async (req, res) => {
  try {
    const asignatura = req.body;

    const result = await pool.query(
      "UPDATE asignatura set a_nombre = $1, did = $2 WHERE aid = $3 RETURNING *",
      [asignatura.a_nombre, asignatura.did, asignatura.aid]
    );

    if (result.rowCount === 0) {
      return res.json({ message: "Datos no insertados" });
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const deleteAsignatura = async (req, res) => {
  try {
    const aid = req.params.aid;

    const result = await pool.query("DELETE FROM asignatura WHERE aid = $1", [
      aid,
    ]);

    if (result.rowCount === 0) {
      return res.json({ message: "Asignatura no eliminada" });
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postAsignatura,
  getAsignaturasDocente,
  getAsignaturasDocenteGrado,
  getAsignaturasGrado,
  updateAsignatura,
  deleteAsignatura,
};

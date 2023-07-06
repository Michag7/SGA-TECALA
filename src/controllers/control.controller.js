const pool = require("../bd");

const postControl = async (req, res) => {
  try {
    const control = req.body;

    const result = await pool.query(
      "INSERT INTO control(c_fecha, gid)VALUES ($1, $2)  RETURNING *",
      [control.c_fecha, control.gid]
    );

    if (result.rowCount === 0) {
      return res.json({ message: "Datos no insertados" });
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const getControl = async (req, res) => {
  try {
    const cid = req.params.cid;

    const result = await pool.query("SELECT * FROM control WHERE cid = $1", [
      cid,
    ]);

    if (result.rowCount == 0) {
      return res.json({ message: "Datos no encontrado" });
    }

    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const getControlFecha = async (req, res) => {
  try {
    const grado = req.params.grado;
    const fecha = req.params.fecha;

    // const result = await pool.query(
    //   `SELECT * FROM control WHERE gid = $1 AND c_fecha = '2023-06-24'`,
    //   [grado]
    // );

    const result = await pool.query(
      `SELECT * FROM control WHERE gid = $1 AND c_fecha = $2`,
      [grado, fecha]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Datos no encontrado" });
    }

    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const getControlGradoMes = async (req, res) => {
  try {
    const grado = req.params.grado;
    const mes = req.params.mes;

    // const result = await pool.query(
    //   `SELECT * FROM control WHERE gid = $1 AND c_fecha = '2023-06-24'`,
    //   [grado]
    // );

    const result = await pool.query(
      "SELECT  * FROM control WHERE EXTRACT(MONTH FROM c_fecha) = $1 AND gid = $2",
      [mes, grado]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Datos no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getControlesAño = async (req, res) => {
  try {
    const año = req.params.ano;

    // const result = await pool.query(
    //   `SELECT * FROM control WHERE gid = $1 AND c_fecha = '2023-06-24'`,
    //   [grado]
    // );

    const result = await pool.query(
      `SELECT  * FROM control WHERE EXTRACT(YEAR FROM c_fecha) = $1`,
      [año]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Datos no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getControlFecha,
  postControl,
  getControlesAño,
  getControlGradoMes,getControl
};

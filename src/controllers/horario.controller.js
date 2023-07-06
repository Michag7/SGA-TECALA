const pool = require("../bd");

const getHorarioDocente = async (req, res) => {
  try {
    const docente = req.params.did;

    const result = await pool.query(
      `SELECT DISTINCT gid
      FROM asignatura
      JOIN horario ON asignatura.aid = horario.aid
      WHERE did = $1;
      `,
      [docente]
    );

    // if (result.rowCount == 0) {
    //   res.status(404).json({ message: "Articulo no encontrado" });
    // }

    res.send(result.rows);
  } catch (error) {
    next(error);
  }
};

const getHorarioDocenteDia = async (req, res) => {
  try {
    const docente = req.params.did;
    const dia = req.params.dia;

    const result = await pool.query(
      `SELECT DISTINCT gid
      FROM asignatura
      JOIN horario ON asignatura.aid = horario.aid
      WHERE did = $1 AND dia = 'MARTES';
      `,
      [docente]
    );

    // if (result.rowCount == 0) {
    //   res.status(404).json({ message: "Articulo no encontrado" });
    // }

    res.send(result.rows);
  } catch (error) {
    next(error);
  }
};

const getHorarioGradoDia = async (req, res) => {
  try {
    const grado = req.params.grado;

    const result = await pool.query(
      `SELECT *
      FROM asignatura
      JOIN horario ON asignatura.aid = horario.aid
      WHERE gid = $1 and dia = 'MARTES';`,
      [grado]
    );

    // if (result.rowCount == 0) {
    //   res.status(404).json({ message: "Articulo no encontrado" });
    // }

    res.send(result.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHorarioGradoDia,
  getHorarioDocenteDia,
  getHorarioDocente,
};

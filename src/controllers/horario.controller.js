const pool = require("../bd");
const { diferenciaHoras } = require("../utils/funciones");

const postHorario = async (req, res) => {
  try {
    const horario = req.body;

    const diferencia = diferenciaHoras(
      horario.hora_inicio,
      horario.hora_finalizacion
    );

    const diferenciaN = parseInt(diferencia, 10);

    console.log(diferencia);
    console.log(diferenciaN);
    console.log(req.body);

    let existsH = false;
    let result = [];

    const fecha = new Date(`2000-01-01T${horario.hora_inicio}`);
    let i = 0;
    while (i < diferenciaN) {
      fecha.setHours(fecha.getHours() + i);

      const horaInicio = fecha.toLocaleTimeString("es-ES", { hour12: false });

      console.log(horaInicio);

      const result1 = await pool.query(
        "SELECT hid, dia, hora_inicio, hora_finalizacion, a_nombre, gid FROM horario JOIN asignatura ON horario.aid = asignatura.aid WHERE dia = $1 AND hora_inicio = $2 AND hora_finalizacion = $3 AND gid = $4 ",
        [horario.dia, horaInicio, horario.hora_finalizacion, horario.gid]
      );

      console.log(result1.rows[0]);

      if (result1.rowCount > 0) {
        return res.status(409).json(result);
      }

      i++;
    }

    

    const result2 = await pool.query(
      "INSERT INTO horario(dia, hora_inicio, hora_finalizacion, aid)VALUES ($1, $2, $3, $4)  RETURNING *",
      [horario.dia, horario.hora_inicio, horario.hora_finalizacion, horario.aid]
    );

    if (result2.rowCount === 0) {
      return res.json({ message: "Horario no creado" });
    }

    res.status(201).json({ message: "Horario creado" });
  } catch (error) {
    console.log(error);
  }
};

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
    console.log(error.message);
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
    console.log(error.message);
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
    console.log(error.message);
  }
};

const getHorariosAsignatura = async (req, res) => {
  try {
    const aid = req.params.aid;

    const result = await pool.query(
      "SELECT * FROM asignatura JOIN horario ON asignatura.aid = horario.aid WHERE horario.aid = $1",
      [aid]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Horario no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteHorario = async (req, res) => {
  try {
    const hid = req.params.hid;

    const result = await pool.query("DELETE FROM horario WHERE hid  = $1", [
      hid,
    ]);

    if (result.rowCount == 0) {
      return res.json({ message: "Horario no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getHorarioGradoDia,
  getHorarioDocenteDia,
  getHorarioDocente,
  getHorariosAsignatura,
  postHorario,
  deleteHorario,
};

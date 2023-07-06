const pool = require("../bd");
const { obtenerAnioActual } = require("../utils/funciones");

const añoActual = obtenerAnioActual();

const postAsistencias = async (req, res) => {
  try {
    const asistencias = req.body;

    var inserts = [];

    for (const asistencia of asistencias) {
      const result = await pool.query(
        "INSERT INTO asistencia(cid, eid, aid, asistencia_tipo, pid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          asistencia.cid,
          asistencia.eid,
          asistencia.aid,
          asistencia.asistencia_tipo,
          asistencia.pid,
        ]
      );

      console.log(result.rows[0]);

      inserts.push(result.rows[0]);
    }

    console.log(inserts);

    if (inserts.length === 0) {
      return res.json({ message: "Articulo no insertados" });
    }

    res.status(201).send(inserts);
  } catch (error) {
    console.log(error);
  }
};

const getAsistenciasAsignaturaPeriodo = async (req, res) => {
  try {
    const aid = req.params.aid;
    const pid = req.params.pid;

    console.log(pid);

    const result = await pool.query(
      "SELECT * FROM asistencia JOIN control ON asistencia.cid = control.cid WHERE aid = $1 AND pid = $2",
      [aid, pid]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Articulo no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getAsistenciasEstudianteAsignaturaPeriodo = async (req, res) => {
  try {
    const eid = req.params.eid;
    const aid = req.params.aid;
    const pid = req.params.pid;

    console.log(pid);

    const result = await pool.query(
      "SELECT * FROM asistencia JOIN control ON asistencia.cid = control.cid WHERE eid = $1 AND aid = $2 AND pid = $3 AND EXTRACT(YEAR FROM c_fecha) = $4",
      [eid, aid, pid, añoActual]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Articulo no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getMesesAsignatura = async (req, res) => {
  try {
    const aid = req.params.aid;

    const result = await pool.query(
      "SELECT DISTINCT EXTRACT(MONTH FROM c_fecha) FROM asistencia JOIN control ON asistencia.cid = control.cid WHERE aid = $1",
      [aid]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Articulo no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getPeriodosAsignatura = async (req, res) => {
  try {
    const aid = req.params.aid;

    const result = await pool.query(
      "SELECT DISTINCT pid FROM asistencia JOIN control ON asistencia.cid = control.cid WHERE aid = $1",
      [aid]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Articulo no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getPeriodosAsistenciasEstudiante = async (req, res) => {
  try {
    const eid = req.params.eid;

    const result = await pool.query(
      "SELECT DISTINCT pid FROM asistencia JOIN control ON asistencia.cid = control.cid WHERE eid = $1 AND EXTRACT(YEAR FROM c_fecha) = $2",
      [eid, añoActual]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Articulo no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getAsistenciasAsignaturaMes = async (req, res) => {
  try {
    const aid = req.params.aid;
    const mes = req.params.mes;

    const result = await pool.query(
      "SELECT * FROM asistencia JOIN control ON asistencia.cid = control.cid WHERE aid = $1 AND EXTRACT(MONTH FROM c_fecha) = $2",
      [aid, mes]
    );

    if (result.rowCount == 0) {
      return res.json({ message: "Articulo no encontrado" });
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getAsistencias = async (req, res) => {
  try {
    const control = req.params.control;

    const result = await pool.query(
      `SELECT asistencia_id, asistencia_tipo, aid, id, nombre, apellido
      FROM asistencia
      JOIN estudiante ON asistencia.eid = estudiante.id
      WHERE cid = $1`,
      [control]
    );

    // if (result.rowCount == 0) {
    //   res.status(404).json({ message: "Articulo no encontrado" });
    // }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getEstudiantesInasistentes = async (req, res) => {
  try {
    const control = req.params.control;

    const result = await pool.query(
      `SELECT eid, hora1, hora2, hora3, hora4, hora5, hora6
      FROM crosstab(
        'SELECT eid, asistencia_id, asistencia_tipo
         FROM asistencia 
         WHERE cid = ${control}
         ORDER BY 1,2 ASC'
      ) AS (
        eid integer,
        hora1 varchar,
        hora2 varchar,
        hora3 varchar,
        hora4 varchar,
        hora5 varchar,
        hora6 varchar
      )
      WHERE 'Inasistencia' IN (hora1::varchar, hora2::varchar, hora3::varchar, hora4::varchar, hora5::varchar, hora6::varchar)`
    );

    console.log(result.rowCount);
    console.log(result.rows);

    res.send(result.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const getControlAsistenciaAsignatura = async (req, res) => {
  try {
    const asignatura = req.params.asignatura;
    const control = req.params.control;

    const result = await pool.query(
      `SELECT asistencia_id, asistencia_tipo, aid, id, nombre, apellido
      FROM asistencia
      JOIN estudiante ON asistencia.eid = estudiante.id
      WHERE cid = $1 and aid = $2`,
      [control, asignatura]
    );

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const updateAsistencias = async (req, res) => {
  try {
    const asistencias = req.body;

    var inserts = [];

    asistencias.forEach(async (asistencia) => {
      const result = await pool.query(
        "UPDATE asistencia SET asistencia_tipo = $1 WHERE asistencia_id = $2  RETURNING *",
        [asistencia.asistencia_tipo, asistencia.asistencia_id]
      );

      inserts.push(result.rows[0]);
    });

    if (inserts.length === 0) {
      return res.json({ message: "Articulo no actualizados" });
    }

    res.json(inserts);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getControlAsistenciaAsignatura,
  getAsistencias,
  postAsistencias,
  updateAsistencias,
  getEstudiantesInasistentes,
  getMesesAsignatura,
  getAsistenciasAsignaturaPeriodo,
  getAsistenciasAsignaturaMes,
  getPeriodosAsignatura,
  getAsistenciasEstudianteAsignaturaPeriodo,
  getPeriodosAsistenciasEstudiante,
};

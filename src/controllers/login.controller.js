const pool = require("../bd");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query(
      "SELECT * FROM cuenta WHERE usuario = $1 AND contraseña = $2",
      [username, password]
    );

    const login = result.rows[0];
    console.log(login);

    if (result.rowCount == 0) {
      return res.status(404).json({message: "Usuario no encontrado"});
    }

    if (result.rowCount > 0) {
      const result2 = await pool.query(
        `SELECT 'docente' as rol, *
        FROM docente
        WHERE cuentaid = $1
        UNION
        SELECT 'administrador' as rol, *
        FROM administrador
        WHERE cuentaid = $1;`,
        [login.cuenta_id]
      );

      const user = result2.rows[0];

      if (result2.rowCount > 0) {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });

        const tokenj = { token };
        const imagen = user.foto.toString("base64");
        const response = { tokenj, user, imagen };

        res.json(response);
      } else {
        res.send({ message: "Usuario no encontrado" });
      }
    } else {
      res.status(404);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  postLogin,
};

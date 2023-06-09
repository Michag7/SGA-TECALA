const { user } = require("pg/lib/defaults");
const pool = require("../bd");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query(
      "SELECT * FROM administrador WHERE aid = $1 AND a_password = $2",
      [username, password]
    );

    const user = result.rows[0];
    console.log(user);

    const token = jwt.sign({ userId: user.aid }, "K34sVcc6GMASMG4BlpdP", {
      expiresIn: "1h",
    });
    if (result.rowCount > 0) {
      res.json({ token });
    } else {
      res.send({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  postLogin,
};

const pool = require("../bd");

const postLogin = (req, res) => {
  try {
    const { username, password } = req.body;
    pool.query(
      "SELECT * FROM administrador WHERE aid = $1 AND a_password = $2",
      [username, password],
      (err, result) => {
        if (err) {
          console.log(err);
        }

        if (result.rowCount > 0) {
          res.send(result);
        } else {
          res.send({ message: "Usuario no encontrado" });
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  postLogin,
};

const pool = require("../bd");

const getEstudiante = async (req, res) => {
  const stu = await pool.query("SELECT * FROM administrador");
  console.log(stu);
  res.send("estudiante");
};



module.exports = {
  getEstudiante,
};

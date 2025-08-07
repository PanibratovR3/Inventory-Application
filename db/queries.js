const pool = require("./pool");

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developer");
  return rows;
}

module.exports = {
  getAllDevelopers,
};

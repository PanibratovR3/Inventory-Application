const pool = require("./pool");

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developer");
  return rows;
}

async function createDeveloper(name) {
  await pool.query("INSERT INTO developer(name) VALUES($1);", [name]);
}

module.exports = {
  getAllDevelopers,
  createDeveloper,
};

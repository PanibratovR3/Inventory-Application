const pool = require("./pool");

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developer");
  return rows;
}

async function createDeveloper(name) {
  await pool.query("INSERT INTO developer(name) VALUES($1);", [name]);
}

async function getDeveloperById(id) {
  const { rows } = await pool.query(
    "SELECT id, name FROM developer WHERE id = $1",
    [id]
  );
  return rows[0];
}

async function updateDeveloper(id, name) {
  await pool.query("UPDATE developer SET name = $1 WHERE id = $2", [name, id]);
}

async function deleteDeveloper(id) {
  await pool.query("DELETE FROM developer WHERE id = $1", [id]);
}

async function getAllPublishers() {
  const { rows } = await pool.query("SELECT * FROM publisher");
  return rows;
}

module.exports = {
  getAllDevelopers,
  createDeveloper,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
  getAllPublishers,
};

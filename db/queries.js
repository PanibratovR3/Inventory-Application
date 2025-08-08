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

async function createPublisher(name) {
  await pool.query("INSERT INTO publisher(name) VALUES($1);", [name]);
}

async function getPublisherById(id) {
  const { rows } = await pool.query(
    "SELECT id, name FROM publisher WHERE id = $1",
    [id]
  );
  return rows[0];
}

async function updatePublisher(id, name) {
  await pool.query("UPDATE publisher SET name = $1 WHERE id = $2", [name, id]);
}

async function deletePublisher(id) {
  await pool.query("DELETE FROM publisher WHERE id = $1", [id]);
}

async function getAllPlatforms() {
  const { rows } = await pool.query("SELECT * FROM platform");
  return rows;
}

async function createPlatform(name) {
  await pool.query("INSERT INTO platform(name) VALUES($1)", [name]);
}

async function getPlatformById(id) {
  const { rows } = await pool.query(
    "SELECT id, name FROM platform WHERE id = $1",
    [id]
  );
  return rows[0];
}

async function updatePlatform(id, name) {
  await pool.query("UPDATE platform SET name = $1 WHERE id = $2", [name, id]);
}

async function deletePlatform(id) {
  await pool.query("DELETE FROM platform WHERE id = $1", [id]);
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genre");
  return rows;
}

async function createGenre(name) {
  await pool.query("INSERT INTO genre(name) VALUES($1)", [name]);
}

module.exports = {
  getAllDevelopers,
  createDeveloper,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
  getAllPublishers,
  createPublisher,
  getPublisherById,
  updatePublisher,
  deletePublisher,
  getAllPlatforms,
  createPlatform,
  getPlatformById,
  updatePlatform,
  deletePlatform,
  getAllGenres,
  createGenre,
};

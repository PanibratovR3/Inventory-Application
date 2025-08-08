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

async function getGenreById(id) {
  const { rows } = await pool.query(
    "SELECT id, name FROM genre WHERE id = $1;",
    [id]
  );
  return rows[0];
}

async function updateGenre(id, name) {
  await pool.query("UPDATE genre SET name = $1 WHERE id = $2", [name, id]);
}

async function deleteGenre(id) {
  await pool.query("DELETE FROM genre WHERE id = $1", [id]);
}

async function getAllGames() {
  const SQL = `
    SELECT 
        game.id, 
        game.title, 
        developer.name AS developername, 
        genre.name AS genrename,
        publisher.name AS publishername,
        platform.name AS platformname,
        game_publisher_platform.dateofrelease
        FROM game
            INNER JOIN developer ON game.developerid = developer.id
            INNER JOIN genre ON game.genreid = genre.id
            INNER JOIN game_publisher_platform ON game.id = game_publisher_platform.gameid
            INNER JOIN publisher ON game_publisher_platform.publisherid = publisher.id
            INNER JOIN platform ON game_publisher_platform.platformid = platform.id;  
  `;
  const { rows } = await pool.query(SQL);
  return rows;
}

async function createGame(
  title,
  developerId,
  genreId,
  publisherId,
  platformId,
  dateOfRelease
) {
  await pool.query(
    "INSERT INTO game(title, developerid, genreid) VALUES($1, $2, $3);",
    [title, developerId, genreId]
  );
  await pool.query(
    "INSERT INTO game_publisher_platform(gameid, publisherid, platformid, dateofrelease) VALUES(lastval(),$1, $2, $3);",
    [publisherId, platformId, dateOfRelease]
  );
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
  getGenreById,
  updateGenre,
  deleteGenre,
  getAllGames,
  createGame,
};

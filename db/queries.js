const pool = require("./pool");

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developer ORDER BY name");
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
  const { rows } = await pool.query("SELECT * FROM publisher ORDER BY name");
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
  const { rows } = await pool.query("SELECT * FROM platform ORDER BY name");
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
  const { rows } = await pool.query("SELECT * FROM genre ORDER BY name;");
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
            INNER JOIN platform ON game_publisher_platform.platformid = platform.id
        ORDER BY
          game.title,
          game_publisher_platform.dateofrelease;  
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

async function getGameById(id) {
  const SQL = `
    SELECT 
        game.id, 
        game.title,
        developer.id AS developerid, 
        developer.name AS developername,
        genre.id AS genreid, 
        genre.name AS genrename,
        publisher.id AS publisherid,
        publisher.name AS publishername,
        platform.id AS platformid,
        platform.name AS platformname,
        game_publisher_platform.dateofrelease
        FROM game
            INNER JOIN developer ON game.developerid = developer.id
            INNER JOIN genre ON game.genreid = genre.id
            INNER JOIN game_publisher_platform ON game.id = game_publisher_platform.gameid
            INNER JOIN publisher ON game_publisher_platform.publisherid = publisher.id
            INNER JOIN platform ON game_publisher_platform.platformid = platform.id
        WHERE game.id = $1;  
  `;
  const { rows } = await pool.query(SQL, [id]);
  return rows[0];
}

async function updateGame(
  id,
  title,
  developerId,
  genreId,
  publisherId,
  platformId,
  dateOfRelease
) {
  await pool.query(
    "UPDATE game SET title = $1, developerid = $2, genreid = $3 WHERE id = $4;",
    [title, developerId, genreId, id]
  );
  await pool.query(
    "UPDATE game_publisher_platform SET publisherid = $1, platformid = $2, dateofrelease = $3 WHERE gameid = $4;",
    [publisherId, platformId, dateOfRelease, id]
  );
}

async function deleteGame(id) {
  await pool.query("DELETE FROM game_publisher_platform WHERE gameid = $1", [
    id,
  ]);
  await pool.query("DELETE FROM game WHERE id = $1", [id]);
}

async function searchGames(
  name,
  developerId,
  genreId,
  publisherId,
  platformId
) {
  const SQL = `
SELECT 
    game.id, 
    game.title,
    developer.id AS developerid, 
    developer.name AS developername,
    genre.id AS genreid, 
    genre.name AS genrename,
    publisher.id AS publisherid,
    publisher.name AS publishername,
    platform.id AS platformid,
    platform.name AS platformname,
    game_publisher_platform.dateofrelease
    FROM game
        INNER JOIN developer ON game.developerid = developer.id
        INNER JOIN genre ON game.genreid = genre.id
        INNER JOIN game_publisher_platform ON game.id = game_publisher_platform.gameid
        INNER JOIN publisher ON game_publisher_platform.publisherid = publisher.id
        INNER JOIN platform ON game_publisher_platform.platformid = platform.id
    WHERE game.title LIKE $1
        OR developerid = $2
        OR genreid = $3
        OR publisherid = $4
        OR platformid = $5;
  `;
  const { rows } = await pool.query(SQL, [
    `%${name}%`,
    developerId,
    genreId,
    publisherId,
    platformId,
  ]);
  return rows;
}

async function findDeveloperFromGames(developerId) {
  const { rows } = await pool.query(
    "SELECT * FROM game WHERE game.developerid = $1",
    [developerId]
  );
  return rows;
}

async function findGenresFromGames(genreId) {
  const { rows } = await pool.query(
    "SELECT * FROM game WHERE game.genreid = $1",
    [genreId]
  );
  return rows;
}

async function findPublisherFromGames(publisherId) {
  const { rows } = await pool.query(
    "SELECT * FROM game_publisher_platform WHERE game_publisher_platform.publisherid = $1",
    [publisherId]
  );
  return rows;
}

async function findPlatformFromGames(platformId) {
  const { rows } = await pool.query(
    "SELECT * FROM game_publisher_platform WHERE game_publisher_platform.platformid = $1",
    [platformId]
  );
  return rows;
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
  getGameById,
  updateGame,
  deleteGame,
  searchGames,
  findDeveloperFromGames,
  findGenresFromGames,
  findPublisherFromGames,
  findPlatformFromGames,
};

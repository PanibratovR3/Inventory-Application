const pool = require("../db/pool");
const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

const titleErr = "must contain at least 3 characters.";
const selectErr = "cannot be empty.";

const validateGameCreate = [
  body("gameTitle")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage(`Title of game ${titleErr}`),
  body("genre").notEmpty().withMessage(`Genre ${selectErr}`),
  body("developer").notEmpty().withMessage(`Developer ${selectErr}`),
  body("publisher").notEmpty().withMessage(`Publisher ${selectErr}`),
  body("platform").notEmpty().withMessage(`Platform ${selectErr}`),
];

const validateGameUpdate = [
  body("gameTitle")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage(`Title of game ${titleErr}`),
];

async function showAllGames(request, response) {
  const games = await queries.getAllGames();
  response.render("games", {
    title: "List of all games",
    games: games,
  });
}

async function createGameGet(request, response) {
  const developers = await queries.getAllDevelopers();
  const genres = await queries.getAllGenres();
  const publishers = await queries.getAllPublishers();
  const platforms = await queries.getAllPlatforms();
  response.render("createGame", {
    title: "Add new game",
    developers: developers,
    genres: genres,
    publishers: publishers,
    platforms: platforms,
  });
}

const createGamePost = [
  validateGameCreate,
  async (request, response) => {
    const { gameTitle, developer, genre, publisher, platform, dateOfRelease } =
      request.body;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      const developers = await queries.getAllDevelopers();
      const genres = await queries.getAllGenres();
      const publishers = await queries.getAllPublishers();
      const platforms = await queries.getAllPlatforms();
      response.render("createGame", {
        title: "Add new game",
        developers: developers,
        genres: genres,
        publishers: publishers,
        platforms: platforms,
        errors: errors.array(),
      });
    } else {
      await queries.createGame(
        gameTitle,
        Number(developer),
        Number(genre),
        Number(publisher),
        Number(platform),
        dateOfRelease
      );
      response.redirect("/");
    }
  },
];

async function updateGameGet(request, response) {
  const { id } = request.params;
  const game = await queries.getGameById(Number(id));
  const developers = await queries.getAllDevelopers();
  const genres = await queries.getAllGenres();
  const publishers = await queries.getAllPublishers();
  const platforms = await queries.getAllPlatforms();
  response.render("updateGame", {
    title: "Update game",
    game: game,
    developers: developers,
    genres: genres,
    publishers: publishers,
    platforms: platforms,
  });
}

const updateGamePost = [
  validateGameUpdate,
  async (request, response) => {
    const { id } = request.params;
    const { gameTitle, developer, genre, publisher, platform, dateOfRelease } =
      request.body;
    const game = await queries.getGameById(Number(id));
    const developers = await queries.getAllDevelopers();
    const genres = await queries.getAllGenres();
    const publishers = await queries.getAllPublishers();
    const platforms = await queries.getAllPlatforms();
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render("updateGame", {
        title: "Update game",
        game: game,
        developers: developers,
        genres: genres,
        publishers: publishers,
        platforms: platforms,
        errors: errors.array(),
      });
    } else {
      await queries.updateGame(
        Number(id),
        gameTitle,
        Number(developer),
        Number(genre),
        Number(publisher),
        Number(platform),
        dateOfRelease
      );
      response.redirect("/");
    }
  },
];

async function deleteGamePost(request, response) {
  const { id } = request.params;
  await queries.deleteGame(Number(id));
  response.redirect("/");
}

module.exports = {
  showAllGames,
  createGameGet,
  createGamePost,
  updateGameGet,
  updateGamePost,
  deleteGamePost,
};

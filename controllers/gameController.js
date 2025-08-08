const pool = require("../db/pool");
const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

const titleErr = "must contain at least 3 characters.";
const selectErr = "cannot be empty.";

const validateGame = [
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
  validateGame,
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

module.exports = {
  showAllGames,
  createGameGet,
  createGamePost,
};

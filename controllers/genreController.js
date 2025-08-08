const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

const genreNameErr = "must contain at least 3 characters.";

const validatePlatform = [
  body("genreName")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage(`Name of genre ${genreNameErr}`),
];

async function showAllGenres(request, response) {
  const genres = await queries.getAllGenres();
  response.render("genres", {
    title: "List of genres",
    genres: genres,
  });
}

async function createGenreGet(request, response) {
  response.render("createGenre", {
    title: "Add new genre",
  });
}

const createGenrePost = [
  validatePlatform,
  async (request, response) => {
    const { genreName } = request.body;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render("createGenre", {
        title: "Add new genre",
        errors: errors.array(),
      });
    } else {
      await queries.createGenre(genreName);
      response.redirect("/genres");
    }
  },
];

module.exports = {
  showAllGenres,
  createGenreGet,
  createGenrePost,
};

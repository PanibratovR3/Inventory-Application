const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

const genreNameErr = "must contain at least 3 characters.";
const genreOpenScriptErr = "must not contain open script tag.";
const genreCloseScritpErr = "must not contain closed script tag.";

const validatePlatform = [
  body("genreName")
    .trim()
    .isLength({ min: 3 })
    .withMessage(`Name of genre ${genreNameErr}`)
    .not()
    .contains("<script>")
    .withMessage(`Name of genre ${genreOpenScriptErr}`)
    .not()
    .contains("</script>")
    .withMessage(`Name of genre ${genreCloseScritpErr}`),
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

async function updateGenreGet(request, response) {
  const { id } = request.params;
  const genre = await queries.getGenreById(Number(id));
  response.render("updateGenre", {
    title: "Update genre",
    genre: genre,
  });
}

const updateGenrePost = [
  validatePlatform,
  async (request, response) => {
    const { id } = request.params;
    const genre = await queries.getGenreById(Number(id));
    const { genreName } = request.body;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render("updateGenre", {
        title: "Update genre",
        genre: genre,
        errors: errors.array(),
      });
    } else {
      await queries.updateGenre(id, genreName);
      response.redirect("/genres");
    }
  },
];

async function deleteGenrePost(request, response) {
  const { id } = request.params;
  const gamesWithThisGenre = await queries.findGenresFromGames(Number(id));
  if (gamesWithThisGenre.length === 0) {
    await queries.deleteGenre(Number(id));
    response.redirect("/genres");
  } else {
    const genres = await queries.getAllGenres();
    response.render("genres", {
      title: "List of all genres",
      genres: genres,
      errors: [
        {
          msg: "Cannot delete genre, because games contain information about this genre.",
        },
      ],
    });
  }
}

module.exports = {
  showAllGenres,
  createGenreGet,
  createGenrePost,
  updateGenreGet,
  updateGenrePost,
  deleteGenrePost,
};

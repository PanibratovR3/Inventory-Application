const queries = require("../db/queries");

async function showAllGenres(request, response) {
  const genres = await queries.getAllGenres();
  response.render("genres", {
    title: "List of genres",
    genres: genres,
  });
}

module.exports = {
  showAllGenres,
};

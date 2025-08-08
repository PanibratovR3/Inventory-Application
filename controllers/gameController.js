const queries = require("../db/queries");

async function showAllGames(request, response) {
  const games = await queries.getAllGames();
  response.render("games", {
    title: "List of all games",
    games: games,
  });
}

module.exports = {
  showAllGames,
};

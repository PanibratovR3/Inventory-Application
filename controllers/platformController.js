const queries = require("../db/queries");

async function showAllPlatforms(request, response) {
  const platforms = await queries.getAllPlatforms();
  response.render("platforms", {
    title: "List of platforms",
    platforms: platforms,
  });
}

module.exports = {
  showAllPlatforms,
};

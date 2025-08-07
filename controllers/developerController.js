const queries = require("../db/queries");

async function showAllDevelopers(request, response) {
  const developers = await queries.getAllDevelopers();
  response.render("developers", {
    title: "List of developers",
    developers: developers,
  });
}

module.exports = {
  showAllDevelopers,
};

const queries = require("../db/queries");

async function showAllPublishers(request, response) {
  const publishers = await queries.getAllPublishers();
  response.render("publishers", {
    title: "List of publishers",
    publishers: publishers,
  });
}

module.exports = {
  showAllPublishers,
};

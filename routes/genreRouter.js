const { Router } = require("express");
const genreController = require("../controllers/genreController");

const genreRouter = Router();
genreRouter.get("/", genreController.showAllGenres);

module.exports = genreRouter;

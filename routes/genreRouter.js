const { Router } = require("express");
const genreController = require("../controllers/genreController");

const genreRouter = Router();
genreRouter.get("/", genreController.showAllGenres);
genreRouter.get("/create", genreController.createGenreGet);
genreRouter.post("/create", genreController.createGenrePost);

module.exports = genreRouter;

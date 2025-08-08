const { Router } = require("express");
const genreController = require("../controllers/genreController");

const genreRouter = Router();
genreRouter.get("/", genreController.showAllGenres);
genreRouter.get("/create", genreController.createGenreGet);
genreRouter.post("/create", genreController.createGenrePost);
genreRouter.get("/:id/update", genreController.updateGenreGet);
genreRouter.post("/:id/update", genreController.updateGenrePost);
genreRouter.post("/:id/delete", genreController.deleteGenrePost);

module.exports = genreRouter;

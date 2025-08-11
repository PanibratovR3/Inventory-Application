const { Router } = require("express");
const gameController = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/", gameController.showAllGames);
gameRouter.get("/search", gameController.searchGamesGet);
gameRouter.get("/create", gameController.createGameGet);
gameRouter.post("/create", gameController.createGamePost);
gameRouter.get("/:id/update", gameController.updateGameGet);
gameRouter.post("/:id/update", gameController.updateGamePost);
gameRouter.post("/:id/delete", gameController.deleteGamePost);

module.exports = gameRouter;

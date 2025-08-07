const { Router } = require("express");
const developerController = require("../controllers/developerController");
const developerRouter = Router();

developerRouter.get("/", developerController.showAllDevelopers);
developerRouter.get("/create", developerController.createDeveloperGet);
developerRouter.post("/create", developerController.createDeveloperPost);

module.exports = developerRouter;

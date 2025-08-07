const { Router } = require("express");
const developerController = require("../controllers/developerController");
const developerRouter = Router();

developerRouter.get("/", developerController.showAllDevelopers);
developerRouter.get("/create", developerController.createDeveloperGet);
developerRouter.post("/create", developerController.createDeveloperPost);
developerRouter.get("/:id/update", developerController.updateDeveloperGet);
developerRouter.post("/:id/update", developerController.updateDeveloperPost);

module.exports = developerRouter;

const { Router } = require("express");

const platformController = require("../controllers/platformController");

const platformRouter = Router();

platformRouter.get("/", platformController.showAllPlatforms);
platformRouter.get("/create", platformController.createPlatformGet);
platformRouter.post("/create", platformController.createPlatformPost);
platformRouter.get("/:id/update", platformController.updatePlatformGet);
platformRouter.post("/:id/update", platformController.updatePlatformPost);

module.exports = platformRouter;

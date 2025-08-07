const { Router } = require("express");

const platformController = require("../controllers/platformController");

const platformRouter = Router();

platformRouter.get("/", platformController.showAllPlatforms);
platformRouter.get("/create", platformController.createPlatformGet);
platformRouter.post("/create", platformController.createPlatformPost);

module.exports = platformRouter;

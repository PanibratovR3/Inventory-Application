const { Router } = require("express");

const platformController = require("../controllers/platformController");

const platformRouter = Router();
platformRouter.get("/", platformController.showAllPlatforms);

module.exports = platformRouter;

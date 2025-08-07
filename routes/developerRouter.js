const { Router } = require("express");
const developerController = require("../controllers/developerController");
const developerRouter = Router();

developerRouter.get("/", developerController.showAllDevelopers);

module.exports = developerRouter;

const { Router } = require("express");
const publisherController = require("../controllers/publisherController");

const publisherRouter = Router();
publisherRouter.get("/", publisherController.showAllPublishers);

module.exports = publisherRouter;

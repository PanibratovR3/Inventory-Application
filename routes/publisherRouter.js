const { Router } = require("express");
const publisherController = require("../controllers/publisherController");

const publisherRouter = Router();

publisherRouter.get("/", publisherController.showAllPublishers);
publisherRouter.get("/create", publisherController.createPublisherGet);
publisherRouter.post("/create", publisherController.createPublisherPost);

module.exports = publisherRouter;

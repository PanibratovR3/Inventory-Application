const pool = require("../db/pool");
const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

const publisherErr = "must contain at least 3 symbols.";

const validatePublisher = [
  body("publisherName")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage(`Name of publisher ${publisherErr}`),
];

async function showAllPublishers(request, response) {
  const publishers = await queries.getAllPublishers();
  response.render("publishers", {
    title: "List of publishers",
    publishers: publishers,
  });
}

async function createPublisherGet(request, response) {
  response.render("createPublisher", {
    title: "Add new publisher",
  });
}

const createPublisherPost = [
  validatePublisher,
  async (request, response) => {
    const { publisherName } = request.body;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render("createPublisher", {
        title: "Add new publisher",
        errors: errors.array(),
      });
    } else {
      await queries.createPublisher(publisherName);
      response.redirect("/publishers");
    }
  },
];

async function updatePublisherGet(request, response) {
  const { id } = request.params;
  const publisher = await queries.getPublisherById(Number(id));
  response.render("updatePublisher", {
    title: "Update publisher",
    publisher: publisher,
  });
}

const updatePublisherPost = [
  validatePublisher,
  async (request, response) => {
    const { id } = request.params;
    const publisher = await queries.getPublisherById(Number(id));
    const { publisherName } = request.body;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render("updatePublisher", {
        title: "Update publisher",
        publisher: publisher,
        errors: errors.array(),
      });
    } else {
      await queries.updatePublisher(id, publisherName);
      response.redirect("/publishers");
    }
  },
];

async function deletePublisherPost(request, response) {
  const { id } = request.params;
  await queries.deletePublisher(Number(id));
  response.redirect("/publishers");
}

module.exports = {
  showAllPublishers,
  createPublisherGet,
  createPublisherPost,
  updatePublisherGet,
  updatePublisherPost,
  deletePublisherPost,
};

const pool = require("../db/pool");
const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

const publisherErr = "must contain at least 3 symbols.";
const publisherOpenScriptErr = "must not contain open script tag.";
const publisherCloseScriptErr = "must not contain close script tag.";

const validatePublisher = [
  body("publisherName")
    .trim()
    .isLength({ min: 3 })
    .withMessage(`Name of publisher ${publisherErr}`)
    .not()
    .contains("<script>")
    .withMessage(`Name of publisher ${publisherOpenScriptErr}`)
    .not()
    .contains("</script>")
    .withMessage(`Name of publisher ${publisherCloseScriptErr}`),
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
      const similarPublishers = await queries.getAllPublishersBeforeCreate(
        publisherName
      );
      if (similarPublishers.length > 0) {
        response.render("createPublisher", {
          title: "Add new publisher",
          errors: [
            {
              msg: "Error. New publisher already exists.",
            },
          ],
        });
      } else {
        await queries.createPublisher(publisherName);
        response.redirect("/publishers");
      }
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
      const similarPublishers = await queries.getAllPublishersBeforeUpdate(
        Number(id),
        publisherName
      );
      if (similarPublishers.length > 0) {
        response.render("updatePublisher", {
          title: "Update publisher",
          publisher: publisher,
          errors: [
            {
              msg: "Error. Update version of publisher already exists.",
            },
          ],
        });
      } else {
        await queries.updatePublisher(id, publisherName);
        response.redirect("/publishers");
      }
    }
  },
];

async function deletePublisherPost(request, response) {
  const { id } = request.params;
  const gamesWithThisPublisher = await queries.findPublisherFromGames(
    Number(id)
  );
  if (gamesWithThisPublisher.length === 0) {
    await queries.deletePublisher(Number(id));
    response.redirect("/publishers");
  } else {
    const publishers = await queries.getAllPublishers();
    response.render("publishers", {
      title: "List of all publishers",
      publishers: publishers,
      errors: [
        {
          msg: "Cannot delete publisher, because games contain information about this publisher.",
        },
      ],
    });
  }
}

module.exports = {
  showAllPublishers,
  createPublisherGet,
  createPublisherPost,
  updatePublisherGet,
  updatePublisherPost,
  deletePublisherPost,
};

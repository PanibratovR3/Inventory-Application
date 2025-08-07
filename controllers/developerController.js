const queries = require("../db/queries");

const { body, validationResult } = require("express-validator");

const developerNameErr = "must contain at least 3 symbols";

const validateDeveloper = [
  body("developerName")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage(`Name of developer ${developerNameErr}`),
];

async function showAllDevelopers(request, response) {
  const developers = await queries.getAllDevelopers();
  response.render("developers", {
    title: "List of developers",
    developers: developers,
  });
}

async function createDeveloperGet(request, response) {
  response.render("createDeveloper", {
    title: "Add new developer",
  });
}

const createDeveloperPost = [
  validateDeveloper,
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render("createDeveloper", {
        title: "Add new developer",
        errors: errors.array(),
      });
    }
    const { developerName } = request.body;
    await queries.createDeveloper(developerName);
    response.redirect("/developers");
  },
];

async function updateDeveloperGet(request, response) {
  const { id } = request.params;
  const developer = await queries.getDeveloperById(Number(id));
  response.render("updateDeveloper", {
    title: "Update developer",
    developer: developer,
  });
}

const updateDeveloperPost = [
  validateDeveloper,
  async (request, response) => {
    const { id } = request.params;
    const { developerName } = request.body;
    const developer = await queries.getDeveloperById(Number(id));
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render("updateDeveloper", {
        title: "Update developer",
        developer: developer,
        errors: errors.array(),
      });
    }
    await queries.updateDeveloper(Number(id), developerName);
    response.redirect("/developers");
  },
];

module.exports = {
  showAllDevelopers,
  createDeveloperGet,
  createDeveloperPost,
  updateDeveloperGet,
  updateDeveloperPost,
};

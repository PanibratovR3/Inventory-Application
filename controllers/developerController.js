const pool = require("../db/pool");
const queries = require("../db/queries");

const { body, validationResult } = require("express-validator");

const developerNameErr = "must contain at least 3 symbols";
const developerNameOpenScriptErr = "must not contain open script tag.";
const developerNameCloseScriptErr = "must not contain close script tag.";

const validateDeveloper = [
  body("developerName")
    .trim()
    .isLength({ min: 3 })
    .withMessage(`Name of developer ${developerNameErr}`)
    .not()
    .contains("<script>")
    .withMessage(`Name of developer ${developerNameOpenScriptErr}`)
    .not()
    .contains("</script>")
    .withMessage(`Name of developer ${developerNameCloseScriptErr}`),
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
    } else {
      const { developerName } = request.body;
      const similarDevelopers = await queries.getAllDevelopersBeforeCreate(
        developerName
      );
      if (similarDevelopers.length > 0) {
        response.render("createDeveloper", {
          title: "Add new developer",
          errors: [{ msg: "Error: New developer already exists." }],
        });
      } else {
        await queries.createDeveloper(developerName);
        response.redirect("/developers");
      }
    }
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
    } else {
      const similarDevelopers = await queries.getAllDevelopersBeforeUpdate(
        Number(id),
        developerName
      );
      if (similarDevelopers.length > 0) {
        response.render("updateDeveloper", {
          title: "Update developer",
          developer: developer,
          errors: [
            {
              msg: "Error. Updated version of developer already exists.",
            },
          ],
        });
      } else {
        await queries.updateDeveloper(Number(id), developerName);
        response.redirect("/developers");
      }
    }
  },
];

async function deleteDeveloperPost(request, response) {
  const { id } = request.params;
  const gamesWithThisDeveloper = await queries.findDeveloperFromGames(
    Number(id)
  );
  if (gamesWithThisDeveloper.length === 0) {
    await queries.deleteDeveloper(Number(id));
    response.redirect("/developers");
  } else {
    const developers = await queries.getAllDevelopers();
    response.render("developers", {
      title: "List of all developers",
      developers: developers,
      errors: [
        {
          msg: "Cannot delete developer, because games contain information about this developer.",
        },
      ],
    });
  }
}

module.exports = {
  showAllDevelopers,
  createDeveloperGet,
  createDeveloperPost,
  updateDeveloperGet,
  updateDeveloperPost,
  deleteDeveloperPost,
};

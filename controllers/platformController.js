const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

const platformNameErr = "must contain at least 2 symbols.";

const validatePlatform = [
  body("platformName")
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage(`Name of platform ${platformNameErr}`),
];

async function showAllPlatforms(request, response) {
  const platforms = await queries.getAllPlatforms();
  response.render("platforms", {
    title: "List of platforms",
    platforms: platforms,
  });
}

async function createPlatformGet(request, response) {
  response.render("createPlatform", {
    title: "Add new platform",
  });
}

const createPlatformPost = [
  validatePlatform,
  async (request, response) => {
    const { platformName } = request.body;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render("createPlatform", {
        title: "Add new platform",
        errors: errors.array(),
      });
    } else {
      await queries.createPlatform(platformName);
      response.redirect("/platforms");
    }
  },
];

async function updatePlatformGet(request, response) {
  const { id } = request.params;
  const platform = await queries.getPlatformById(Number(id));
  response.render("updatePlatform", {
    title: "Update platform",
    platform: platform,
  });
}

const updatePlatformPost = [
  validatePlatform,
  async (request, response) => {
    const { id } = request.params;
    const { platformName } = request.body;
    const platform = await queries.getPlatformById(Number(id));
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render("updatePlatform", {
        title: "Update platform",
        platform: platform,
        errors: errors.array(),
      });
    } else {
      await queries.updatePlatform(Number(id), platformName);
      response.redirect("/platforms");
    }
  },
];

module.exports = {
  showAllPlatforms,
  createPlatformGet,
  createPlatformPost,
  updatePlatformGet,
  updatePlatformPost,
};

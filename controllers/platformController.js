const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

const platformNameErr = "must contain at least 2 symbols.";
const platformOpenScriptErr = "must not contain open script tag.";
const platformCloseScriptErr = "must not containe close script tag.";

const validatePlatform = [
  body("platformName")
    .trim()
    .isLength({ min: 2 })
    .withMessage(`Name of platform ${platformNameErr}`)
    .not()
    .contains("<script>")
    .withMessage(`Name of platform ${platformOpenScriptErr}`)
    .not()
    .contains("</script>")
    .withMessage(`Name of platform ${platformCloseScriptErr}`),
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
      const similarPlatforms = await queries.getAllPlatformsBeforeCreate(
        platformName
      );
      if (similarPlatforms.length > 0) {
        response.render("createPlatform", {
          title: "Add new platform",
          errors: [
            {
              msg: "Error. New platform already exists.",
            },
          ],
        });
      } else {
        await queries.createPlatform(platformName);
        response.redirect("/platforms");
      }
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
      const similarPlatforms = await queries.getAllPlatformsBeforeUpdate(
        Number(id),
        platformName
      );
      if (similarPlatforms.length > 0) {
        response.render("updatePlatform", {
          title: "Update platform",
          platform: platform,
          errors: [
            {
              msg: "Error. Updated version of platform already exists.",
            },
          ],
        });
      } else {
        await queries.updatePlatform(Number(id), platformName);
        response.redirect("/platforms");
      }
    }
  },
];

async function deletePlatformPost(request, response) {
  const { id } = request.params;
  const gamesWithThisPlatform = await queries.findPlatformFromGames(Number(id));
  if (gamesWithThisPlatform.length === 0) {
    await queries.deletePlatform(Number(id));
    response.redirect("/platforms");
  } else {
    const platforms = await queries.getAllPlatforms();
    response.render("platforms", {
      title: "List of platforms",
      platforms: platforms,
      errors: [
        {
          msg: "Cannot delete this platform, because games contain information about this platform.",
        },
      ],
    });
  }
}

module.exports = {
  showAllPlatforms,
  createPlatformGet,
  createPlatformPost,
  updatePlatformGet,
  updatePlatformPost,
  deletePlatformPost,
};

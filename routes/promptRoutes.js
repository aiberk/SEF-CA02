const router = require("express").Router();
const promptController = require("../controllers/promptController");
const userController = require("../controllers/usersController");

/**
 * GET / - Fetch all prompt and render the prompts page index page
 */
router.get("/", promptController.index);

/**
 * POST / - Create a new prompt in the database
 */
router.post(
  "/create",
  userController.isAuthenticated,
  promptController.create,
  promptController.redirectView
);

router.delete(
  "/:id/delete",
  promptController.delete,
  promptController.redirectView
);

module.exports = router;

const router = require("express").Router();
const promptController = require("../controllers/promptController");

/**
 * GET / - Fetch all prompt and render the prompts page index page
 */
router.get("/", promptController.index);

/**
 * POST / - Create a new prompt in the database
 */
router.post("/create", promptController.create, promptController.redirectView);

/**
 * GET /new - Render the new prompt page
 */
// router.get("/new", promptController.new);

/**
 * POST /create - Validate user input, create a new user in the database, and redirect to the user index page
 * @param {Function} validate - Middleware function for validating user input
 * @param {Function} create - Controller function for creating a new user in the database
 * @param {Function} redirectView - Controller function for redirecting to a specified view
 */
// router.post("/create", (req, res) => {
//   promptController.create(req, res);
// });

module.exports = router;

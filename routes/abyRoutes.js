const router = require("express").Router();
const abyController = require("../controllers/abyController");
const userController = require("../controllers/usersController");

/**
 * GET / - Fetch all aby and render the abys page index page
 */
router.get("/", abyController.index);

/**
 * POST / - Create a new aby in the database
 */
router.post(
  "/create",
  userController.isAuthenticated,
  abyController.create,
  abyController.redirectView
);

/**
 * GET /new - Render the new aby page
 */
// router.get("/new", abyController.new);

/**
 * POST /create - Validate user input, create a new user in the database, and redirect to the user index page
 * @param {Function} validate - Middleware function for validating user input
 * @param {Function} create - Controller function for creating a new user in the database
 * @param {Function} redirectView - Controller function for redirecting to a specified view
 */
// router.post("/create", (req, res) => {
//   abyController.create(req, res);
// });

module.exports = router;

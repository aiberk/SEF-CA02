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

module.exports = router;

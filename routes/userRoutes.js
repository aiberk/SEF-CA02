const router = require("express").Router();
const usersController = require("../controllers/usersController");

/**
 * GET / - Fetch all users and render the user index page
 */
router.get("/", usersController.index, usersController.indexView);

/**
 * GET /new - Render the new user registration page
 */
router.get("/new", usersController.new);

/**
 * POST /create - Validate user input, create a new user in the database, and redirect to the user index page
 * @param {Function} validate - Middleware function for validating user input
 * @param {Function} create - Controller function for creating a new user in the database
 * @param {Function} redirectView - Controller function for redirecting to a specified view
 */
router.post(
  "/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);

/**
 * GET /login - Render the login page
 */
router.get("/login", usersController.login);

/**
 * POST /login - Authenticate a user's login credentials and redirect to the home page
 */
router.post("/login", usersController.authenticate);

/**
 * GET /logout - Log out the current user and redirect to the home page
 * @param {Function} logout - Controller function for logging out a user
 * @param {Function} redirectView - Controller function for redirecting to a specified view
 */
router.get("/logout", usersController.logout, usersController.redirectView);

/**
 * GET /:id/edit - Render the edit user page for the specified user
 */
router.get("/:id/edit", usersController.edit);

/**
 * PUT /:id/update - Update the specified user's profile in the database and redirect to the user's profile page
 * @param {Function} update - Controller function for updating a user's profile in the database
 * @param {Function} redirectView - Controller function for redirecting to a specified view
 */
router.put("/:id/update", usersController.update, usersController.redirectView);

/**
 * GET /:id - Display the specified user's profile page
 */
router.get(
  "/:id",
  usersController.isAuthenticated,
  usersController.show,
  usersController.showView
);

/**
 * DELETE /:id/delete - Delete the specified user from the database and redirect to the user index page
 * @param {Function} delete - Controller function for deleting a user from the database
 * @param {Function} redirectView - Controller function for redirecting to a specified view
 */
router.delete(
  "/:id/delete",
  usersController.isAuthenticated,
  usersController.delete,
  usersController.redirectView
);

module.exports = router;

const router = require("express").Router();
const aaronController = require("../controllers/aaronController");
const userController = require("../controllers/usersController");

router.get("/", aaronController.index);

router.post(
  "/create",
  userController.isAuthenticated,
  aaronController.create,
  aaronController.redirectView
);
router.delete(
  "/:id/delete",
  aaronController.delete,
  aaronController.redirectView
);

module.exports = router;

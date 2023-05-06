const router = require("express").Router();
const eugenioController = require("../controllers/eugenioController");
const userController = require("../controllers/usersController");

router.get("/", eugenioController.index);

router.post(
  "/create",
  userController.isAuthenticated,
  eugenioController.create,
  eugenioController.redirectView
);
router.delete(
  "/:id/delete",
  eugenioController.delete,
  eugenioController.redirectView
);

module.exports = router;

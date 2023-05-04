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



module.exports = router;
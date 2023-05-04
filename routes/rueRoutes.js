
const router = require("express").Router();
const rueController = require("../controllers/rueController");
const userController = require("../controllers/usersController");


router.get("/", rueController.index);

router.post(
  "/create",
  userController.isAuthenticated,
  rueController.create,
  rueController.redirectView
);



module.exports = router;
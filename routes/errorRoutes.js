const express = require("express");
const router = express.Router();
const errorController = require("../controllers/errorController");

router.use(errorController.respondSourceNotFound);
router.use(errorController.respondInternalError);

module.exports = router;

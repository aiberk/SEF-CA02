const router = require('express').Router();
const contactController = require("../controllers/contactController");

router.get("/", contactController.getMessages, contactController.indexView);
router.post("/", contactController.validate('/contact'), contactController.create);

module.exports = router;
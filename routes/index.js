/**
 * Hard coded data to use in through out website
 */
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const errorRoutes = require("./errorRoutes");
const homeRoutes = require("./homeRoutes");

router.use("/user", userRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;

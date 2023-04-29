/**
 * Hard coded data to use in through out website
 */
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const errorRoutes = require("./errorRoutes");
const homeRoutes = require("./homeRoutes");
const promptRoutes = require("./promptRoutes");

router.use("/user", userRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);
router.use("/prompt", promptRoutes);

module.exports = router;

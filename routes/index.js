/**
 * Hard coded data to use in through out website
 */
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const errorRoutes = require("./errorRoutes");
const homeRoutes = require("./homeRoutes");
const promptRoutes = require("./promptRoutes");
const abyRoutes = require("./abyRoutes");

router.use("/", homeRoutes);
router.use("/user", userRoutes);
router.use("/prompt", promptRoutes);
router.use("/aby", abyRoutes);
router.use("/", errorRoutes);
module.exports = router;

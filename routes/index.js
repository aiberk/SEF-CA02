/**
 * Hard coded data to use in through out website
 */
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const errorRoutes = require("./errorRoutes");
const homeRoutes = require("./homeRoutes");
const promptRoutes = require("./promptRoutes");
const abyRoutes = require("./abyRoutes");
const rueRoutes = require("./rueRoutes");
const aaronRoutes = require("./aaronRoutes");
const eugenioRoutes = require("./eugenioRoutes");

router.use("/", homeRoutes);
router.use("/user", userRoutes);
router.use("/aby", abyRoutes);
router.use("/rue", abyRoutes);
router.use("/aaron", abyRoutes);
router.use("/eugenio", abyRoutes);

router.use("/", errorRoutes);
module.exports = router;

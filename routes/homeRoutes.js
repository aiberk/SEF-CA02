const {
  events,
  sponsors,
  homeVars,
  aboutVars,
} = require("../public/js/CONSTANTS");

const router = require("express").Router();
router.get("/", (req, res) => {
  res.render("index", {
    events: events,
    sponsors: sponsors,
    headVars: homeVars,
  });
});

router.get("/about", (req, res) => {
  res.render("about", { headVars: aboutVars });
});

module.exports = router;

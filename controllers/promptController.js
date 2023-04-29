const Prompt = require("../models/Prompt");

const getPromptParams = (body) => {
  return {
    title: body.title,
    description: body.description,
    author: body.author,
    date: body.date,
  };
};

module.exports = {
  index: (req, res) => {
    Prompt.find({})
      .then((prompts) => {
        res.render("prompt/index", { prompts: prompts });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  indexView: (req, res) => {
    res.render("prompt/index");
  },
};

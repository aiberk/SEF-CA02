const Prompt = require("../models/Prompt");

exports.index = (req, res) => {
  Prompt.find({}, (err, prompts) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(prompts);
    }
  });
};

exports.indexView = (req, res) => {
  // Controller function for rendering the new user page
  res.render("prompt/index"); // Render the new user view
};

exports.new = (req, res) => {
  // Controller function for rendering the new user page
  res.render("prompt/new"); // Render the new user view
};

exports.createPrompt = (req, res) => {
  const newPrompt = new Prompt(req.body);
  newPrompt.save((err, prompt) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(prompt);
    }
  });
};

exports.getPromptByAuthor = (req, res) => {
  const author = req.params.author;
  Prompt.findOne({ author: author }, (err, prompt) => {
    if (err) {
      res.status(500).send(err);
    } else if (!prompt) {
      res.status(404).send(`Prompt with author '${author}' not found`);
    } else {
      res.status(200).send(prompt);
    }
  });
};

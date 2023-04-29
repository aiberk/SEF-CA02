const Prompt = require("../models/Prompt");

const getPromptParams = (body) => {
  return {
    prompt: body.prompt,
    author: body.author,
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

  create: (req, res) => {
    console.log(req.body);
    const newPrompt = new Prompt(getPromptParams(req.body));
    newPrompt
      .save()
      .then(() => {
        res.locals.redirect = "/prompt"; // Set the redirect path
        res.redirect(res.locals.redirect); // Redirect to the path
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  redirectView: (req, res, next) => {
    // Middleware function to handle redirects
    let redirectPath = res.locals.redirect; // Get the redirect path from the local variables
    if (redirectPath)
      res.redirect(redirectPath); // If there is a redirect path, redirect to it
    else next(); // Call the next middleware function
  },
};

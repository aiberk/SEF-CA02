const Prompt = require("../models/Prompt");
const User = require("../models/User");

const getPromptParams = (body, userId) => {
  return {
    prompt: body.prompt,
    author: userId,
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
    const userId = req.user._id; // get the ID of the logged-in user
    User.findById(userId)
      .then((user) => {
        // Insert the userId as the author in the new prompt
        const promptParams = getPromptParams(req.body);
        promptParams.author = userId;

        const newPrompt = new Prompt(promptParams);
        newPrompt
          .save()
          .then(() => {
            user.prompts.push(newPrompt._id); // add the prompt ID to the user's prompts array
            return user.save(); // save the user document
          })
          .then(() => {
            res.locals.redirect = "/prompt"; // Set the redirect path
            res.redirect(res.locals.redirect); // Redirect to the path
          })
          .catch((err) => {
            res.status(500).send(err);
          });
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

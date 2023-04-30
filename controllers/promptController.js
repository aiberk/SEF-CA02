require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY3,
});

const openai = new OpenAIApi(configuration);

const Prompt = require("../models/Prompt");
const User = require("../models/User");

const engineeredPrompt = "\n\nAby: ";

const getPromptParams = (body, userId) => {
  return {
    prompt: body.prompt + engineeredPrompt,
    answer: body.answer || "No answer provided",
    author: userId,
    choice: "Aby",
  };
};

module.exports = {
  index: (req, res) => {
    Prompt.find({ choice: "Aby" }) // filter by choice field
      .then((prompts) => {
        res.render("prompt/index", { prompts: prompts });
      })
      .catch((err) => {
        console.error("Error fetching prompts:", err);
        res.status(500).send(err);
      });
  },

  indexView: (req, res) => {
    res.render("prompt/index");
  },

  create: (req, res) => {
    console.log(req.body);
    const userId = req.user._id;
    User.findById(userId)
      .then((user) => {
        const promptParams = getPromptParams(req.body, userId);

        const newPrompt = new Prompt(promptParams);
        return newPrompt
          .save()
          .then(() => {
            user.prompts.push(newPrompt._id);
            return user.save();
          })
          .then(() => {
            return openai.createCompletion({
              model: "text-ada-001",
              prompt: promptParams.prompt,
              max_tokens: 100,
            });
          })
          .then((response) => {
            console.log(response.data.choices[0].text);
            const answer = response.data.choices[0].text.trim(); // trim the whitespace
            newPrompt.answer = answer;
            return newPrompt.save();
          })
          .then(() => {
            res.locals.redirect = "/prompt";
            res.redirect(res.locals.redirect);
          })
          .catch((err) => {
            console.error(
              "Error during prompt creation or OpenAI API call:",
              err
            );
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        res.status(500).send(err);
      });
  },
  delete: (req, res, next) => {
    let promptId = req.params.id; // Get the prompt ID from the request parameters

    Prompt.findById(promptId) // Find the prompt by ID
      .then((prompt) => {
        if (
          (req.isAuthenticated() && req.user._id.equals(prompt.author)) ||
          (req.isAuthenticated() && req.user.isAdmin === true)
        ) {
          // If the user is authenticated and authorized to delete the prompt
          User.updateOne(
            { _id: req.user._id },
            { $pull: { prompts: promptId } }
          ) // Remove the reference from the user's prompts array
            .then(() => {
              return Prompt.findByIdAndRemove(promptId); // Remove the prompt from the database
            })
            .then(() => {
              res.redirect("/prompt"); // Redirect to the prompt index page
            })
            .catch((error) => {
              console.log(`Error deleting prompt by ID: ${error.message}`); // Log any errors
              next(); // Call the next middleware function
            });
        } else {
          // If the user is not authorized to delete the prompt
          req.flash("error", "You are not authorized to perform this action."); // Flash an error message
          res.redirect("/prompt"); // Redirect to the prompt index page
        }
      })
      .catch((error) => {
        console.log(`Error finding prompt by ID: ${error.message}`); // Log any errors
        next(); // Call the next middleware function
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
};

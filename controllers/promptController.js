require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY2,
});

const openai = new OpenAIApi(configuration);

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
            console.log(response.choices[0].text);
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

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
};

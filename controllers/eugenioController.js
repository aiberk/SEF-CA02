require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const Prompt = require("../models/Prompt");
const User = require("../models/User");

//Engineered Prompt String
const engineeredPrompt = "\n\nQ: What is the meaning of life?\nA: ";

const getPromptParams = (body, userId) => {
  return {
    prompt: body.prompt + engineeredPrompt,
    answer: body.answer || "No answer provided",
    author: userId,
    choice: "Eugenio",
  };
};

module.exports = {
  index: (req, res) => {
    Prompt.find({ choice: "Eugenio" }) // filter by choice field
      .then((prompts) => {
        res.render("eugenio/index", { prompts: prompts });
      })
      .catch((err) => {
        console.error("Error fetching prompts:", err);
        res.status(500).send(err);
      });
  },

  indexView: (req, res) => {
    res.render("eugenio/index");
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
            res.locals.redirect = "/eugenio";
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
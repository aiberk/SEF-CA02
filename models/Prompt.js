"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PromptSchema = Schema({
  prompt: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
  },
  choice: {
    type: String,
    enum: ["Aby", "Rue", "Eugenio", "Aaron"],
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // add an index on the author field for performance
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prompt", PromptSchema);

const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    poster: {
      type: String,
    },
    imdbLink: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("movie", MovieSchema);

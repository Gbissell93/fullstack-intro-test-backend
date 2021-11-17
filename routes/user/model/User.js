const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    favorites: [{ type: mongoose.Schema.ObjectId, ref: "movie" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);

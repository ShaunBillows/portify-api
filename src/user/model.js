const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  playlists: [],
});

const User = mongoose.model("user", userSchema);

module.exports = User;

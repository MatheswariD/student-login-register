const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  regno: { type: String, required: true },
  name: { type: String, required: true },
  institute: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  level: { type: Number, default: 2 },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);
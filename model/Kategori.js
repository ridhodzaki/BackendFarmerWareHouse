const mongoose = require("mongoose");

const kategoriSchema = new mongoose.Schema({
  Kategori: { type: String }
});

module.exports = mongoose.model("kategori", kategoriSchema);
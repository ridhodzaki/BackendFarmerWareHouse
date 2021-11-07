const mongoose = require("mongoose");

const barangSchema = new mongoose.Schema({
  namaBarang: { type: String, default: null },
  hargaBarang: { type: Number, default: 0 },
  jenisBarang: { type: String },
  pemilik: { type: String },
  deskripsi: { type: String },
  image: {},
  link: {}
});

module.exports = mongoose.model("barang", barangSchema);
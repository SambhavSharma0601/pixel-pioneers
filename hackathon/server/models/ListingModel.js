const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  sellerEmail: String,
});

module.exports = mongoose.model("Listing", listingSchema);

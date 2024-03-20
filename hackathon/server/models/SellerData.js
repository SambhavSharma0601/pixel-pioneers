const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define schema
const sellerSchema = new mongoose.Schema({
  Seller_ID: {
    type: String,
  },
  Seller_Name: {
    type: String,
  },
  Seller_Address: {
    type: String,
  },
  Seller_Email: {
    type: String,
    required: true,
    unique: true
  },
  Seller_Phone: {
    type: String,
  },
  Seller_PanNumber: {
    type: String,
  },
  Seller_Since: {
    type: Date,
    default: Date.now
  },
  Seller_Password: {
    type: String,
    required: true
  }
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;

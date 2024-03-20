const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: String,
    secondaryImage: String,
    images: [String],
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
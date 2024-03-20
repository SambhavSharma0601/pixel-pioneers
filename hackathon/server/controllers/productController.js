// controllers/productController.js

const Product = require('../models/ListingModel');

// Controller function to get products by seller email
exports.getProductsBySellerEmail = async (req, res) => {
  try {
    
    // Retrieve seller email from request parameters
    const { sellerEmail } = req.params;

    // Retrieve products associated with the seller email from the database
    const products = await Product.find({ sellerEmail });

    // Send the products as a response
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

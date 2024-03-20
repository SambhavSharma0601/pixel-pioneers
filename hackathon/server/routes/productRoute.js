// // routes/productRoutes.js

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const Product = require('../models/ProductSchema');

// // Multer configuration for file upload
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });

// const upload = multer({ storage: storage });

// // Upload endpoint
// router.post('/upload', upload.array('images'), async (req, res) => {
//     try {
//         const { productName, secondaryImage } = req.body;
//         const images = req.files.map(file => file.path);
//         const product = new Product({ productName, secondaryImage, images });
//         await product.save();
//         res.json({ message: 'Product uploaded successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// module.exports = router;
// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get products by seller email
router.get('/:sellerEmail', productController.getProductsBySellerEmail);

module.exports = router;

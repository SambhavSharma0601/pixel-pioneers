// routes/listingRoutes.js

const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const verifyToken = require("../util/verifyToken");
// Create a new listing
router.post("/create-listing", listingController.createListing);

// Get listing by ID
router.get("/listing/:id", listingController.getListingById);


module.exports = router;

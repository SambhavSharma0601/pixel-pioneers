// controllers/listingController.js

const Listing = require('../models/ListingModel');

exports.createListing = async (req, res) => {
    try {
        const listing = await Listing.create(req.body);
        console.log("Listing created");
        return res.status(201).json(listing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getListingById = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(listing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

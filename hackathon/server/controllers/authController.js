const Seller = require('../models/SellerData.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    try {
        const { Seller_Name, Seller_Email, Seller_Password, Seller_Address, Seller_Phone, Seller_PanNumber } = req.body;
        const hashedPassword = bcryptjs.hashSync(Seller_Password, 10);
        const newSeller = new Seller({ Seller_Name, Seller_Email, Seller_Password: hashedPassword, Seller_Address, Seller_Phone, Seller_PanNumber });
        await newSeller.save();
        res.status(201).json('Seller created successfully!');
    } catch (error) {
        next(error);
    }
};


const signin = async (req, res, next) => {
    try {
        const { Seller_Email, Seller_Password } = req.body;
        const validSeller = await Seller.findOne({ Seller_Email });

        if (!validSeller) {
            throw { status: 404, message: 'No such seller exists. Create a new account!' };
        }

        const validPassword = bcryptjs.compareSync(Seller_Password, validSeller.Seller_Password);

        if (!validPassword) {
            throw { status: 404, message: 'Wrong credentials!' };
        }

        const token = jwt.sign({ id: validSeller._id }, process.env.SECRET_KEY);
        const { Seller_Password: pass, ...rest } = validSeller._doc;
   
        res.cookie('jwtoken', token, { httpOnly: true }).status(200).json({ ...rest, token });
    } catch (error) {
        next(error);
    }
};

const signOut = async (req, res, next) => {
    try {
        res.clearCookie('jwtoken');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signup,
    signin,
    signOut
};

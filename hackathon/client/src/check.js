const cloudinary = require('cloudinary').v2;

cloudinary.config({
 cloud_name: 'drnxqtdfo',
 api_key: '727296686627594',
 api_secret: 'Cz99BEIJg9qJH39JjHOjjhZdkgI',
});

const timestamp = Math.round(new Date().getTime() / 1000);
const paramsToSign = `timestamp=${timestamp}&upload_preset=your_upload_preset`;
const signature = cloudinary.utils.api_sign_request(paramsToSign, cloudinary.config().api_secret);

console.log(signature);

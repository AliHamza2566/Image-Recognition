const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: String,
    label: String,
    text: String, // Added field for OCR text
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;

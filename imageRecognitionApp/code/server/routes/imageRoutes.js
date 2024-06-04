const express = require('express');
const router = express.Router();
const Image = require('../model/image');

router.get('/imagesget', async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/images', async (req, res) => {
    const { url, label, text } = req.body; // Added text to the request body
    const newImage = new Image({ url, label, text });
    try {
        await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

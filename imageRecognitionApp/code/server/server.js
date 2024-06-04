const express = require('express');

const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const corsMiddleware = require('./middleware/corsMiddleware');
const imageRoutes = require('./routes/imageRoutes');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(bodyParser.json());
app.use(corsMiddleware);

// Routes
app.use('/api', imageRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

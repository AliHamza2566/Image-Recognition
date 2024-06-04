// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Connected to MongoDB');
//     } catch (err) {
//         console.error('Failed to connect to MongoDB', err);
//         process.exit(1); // Exit process with failure
//     }
// };

// module.exports = connectDB;



const mongoose = require("mongoose")
require("dotenv").config();
// const DB_URI = process.env.DB_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected");
    } catch (error) {
        console.log("Error while connecting: " + error.message);
    }
}

module.exports = connectDB;

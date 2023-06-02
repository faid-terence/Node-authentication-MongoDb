require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Database URL
const DATABASE = process.env.DATABASE_URL;

const connectToDB = async () => {
    try {
        await mongoose.connect(DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully!');

        // Start the server after successful database connection
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};
connectToDB();

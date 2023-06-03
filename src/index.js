require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');


// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Database URL
const DATABASE = process.env.DATABASE_URL;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Terence Faid JABO!');
});
// Import Routes
const usersRoutes = require('./routes/authRoutes')
const otpRoutes = require('./routes/otpRoutes')

// Use Routes
app.use('/api/users', usersRoutes);
app.use('/otp', otpRoutes);

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

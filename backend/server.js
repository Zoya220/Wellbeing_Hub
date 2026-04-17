const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose
require('dotenv').config(); // Import dotenv to read the secret file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the Local MongoDB Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Successfully connected to MongoDB!'))
    .catch((error) => console.log('❌ Database connection error:', error));

// Import the User Model
const User = require('./models/User');

// --- API ROUTES ---

// 1. Test Route
app.get('/test', (req, res) => {
    res.json({ message: "Welcome to the WellBeing Hub Backend!" });
});

// 2. SIGNUP ROUTE
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Basic validation
        if(!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create new user (Trimming spaces and making email lowercase for consistency)
        const newUser = new User({ 
            name: name.trim(), 
            email: email.trim().toLowerCase(), 
            password: password 
        });

        await newUser.save();
        console.log(`👤 New User Registered: ${newUser.email}`);
        res.status(201).json({ message: "User created!", user: newUser });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(400).json({ error: "Email already exists or invalid data" });
    }
});

// 3. LOGIN ROUTE
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const cleanEmail = email.trim().toLowerCase();

        console.log(`🔑 Login Attempt: ${cleanEmail}`);

        // Find user by email and password
        const user = await User.findOne({ email: cleanEmail, password: password });
        
        if (user) {
            console.log("✅ Match Found!");
            res.json({ message: "Login successful", user });
        } else {
            console.log("❌ No Match in Database");
            res.status(401).json({ error: "Invalid credentials. Please check your email and password." });
        }
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// --- START THE SERVER ---
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectMongoDb = require('./connection.js');
const multer = require('multer');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

// Load environment variables if you want (optional)
dotenv.config();

const app = express();

app.use(cors({ origin: `${process.env.FRONTEND_URL}`, credentials: true }));
console.log(process.env.FRONTEND_URL);
// Import routes
const userRoutes = require('./routes/user.js');
const uploadRoutes = require('./routes/upload.js');
const authRoutes = require('./routes/oauth.js');


const port = process.env.PORT || 5001;

// Connect to MongoDB
connectMongoDb("mongodb+srv://itsaastha2005:CdoNrBFS6iv1Iwz0@auth.v4du6sl.mongodb.net/?retryWrites=true&w=majority&appName=Auth")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Body parser middleware
app.use(express.json());

// Session middleware (should be before passport.session())
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false ,   cookie: {
    sameSite: 'none',  // Important for cross-site
    secure: true       // Must be true in production (HTTPS)
  }}));

// **IMPORTANT:** Require passport config before initializing passport
require('./config/passport');

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use("/user", userRoutes);
app.use('/auth', authRoutes);
app.use("/api", uploadRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

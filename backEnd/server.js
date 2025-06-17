const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectMongoDb = require('./connection.js');
const multer = require('multer');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('./cron/sendFollowUp.js'); 

dotenv.config();

const app = express();

const corsOptions = {
  origin:` ${process.env.FRONTEND_URL}`,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

console.log(process.env.FRONTEND_URL);

// Import routes
const userRoutes = require('./routes/user.js');
const uploadRoutes = require('./routes/upload.js');
const authRoutes = require('./routes/oauth.js');
const followUpRoutes = require('./routes/followup.js');


const port = process.env.PORT || 5001;


connectMongoDb(`${process.env.MONGO_URI}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.json());


app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false ,   cookie: {
    sameSite: 'none',  
    secure: true       
  }}));


require('./config/passport');


app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use("/user", userRoutes);
app.use('/auth', authRoutes);
app.use("/api", uploadRoutes);
app.use('/api', followUpRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectMongoDb = require('./connection.js');
const app = express();

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


const userRoutes = require('./routes/user.js');

const port = process.env.PORT || 5001;
connectMongoDb("mongodb+srv://itsaastha2005:CdoNrBFS6iv1Iwz0@auth.v4du6sl.mongodb.net/?retryWrites=true&w=majority&appName=Auth").then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use("/user", userRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
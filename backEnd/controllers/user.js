const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

async function handleUserSignup(req, res) {
  // Extract username and password from request body
  const { name, email, password } = req.body;

  try {
    // Check if a user with the same username already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists'); // Return error if user exists
    }

    // Hash the password before storing it in the database for security
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user instance with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).send('User registered successfully');
  } catch (error) {
    // Handle errors if any occur during registration
    res.status(500).send('Error registering user');
  }
}

async function handleUserLogin(req, res) {
  // Extract username and password from the request body
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    // If user does not exist OR password does not match, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials'); // Unauthorized error
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { email: user.email },  // Payload (data inside the token)
      process.env.JWT_SECRET,      // Secret key for signing the token
      { expiresIn: "1h" }          // Token expiration time (1 hour)
    );

    // Send the generated token as a JSON response
    res.json({ token });
  } catch (error) {
    res.status(500).send('Login failed'); // Handle any unexpected errors
  }
}
module.exports = {
  handleUserSignup,
  handleUserLogin
};
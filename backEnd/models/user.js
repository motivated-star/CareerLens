const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: function () {
      // Password is required only if googleId is not present
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    required: function () {
      // googleId is required only if password is not present
      return !this.password;
    },
  },
});

module.exports = mongoose.model('User', userSchema);

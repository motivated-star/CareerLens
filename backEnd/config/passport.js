const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
  
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;

    // Find existing user
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      console.log('User already exists:', user);
      console.log(process.env.SERVER_URL);
      return done(null, user, { message: 'User already exists, please log in.' });
    }

    // Create new user if not found
    user = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: email,
    });

    console.log('New user created:', user);
    console.log(process.env.SERVER_URL);
    return done(null, user);
  } catch (err) {
    console.error('Error during Google authentication:', err);
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

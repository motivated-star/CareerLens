const express = require('express');
const passport = require('passport');
const { oauthSuccess } = require('../controllers/oauth');

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: `${process.env.FRONTEND_URL}/home`,
    failureRedirect: '/',
  })
);

module.exports = router;

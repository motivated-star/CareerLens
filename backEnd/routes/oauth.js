const express = require('express');
const passport = require('passport');
const { oauthSuccess } = require('../controllers/oauth');

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/', successRedirect: `${process.env.FRONTEND_URL}/home` }),
  oauthSuccess
);

module.exports = router;

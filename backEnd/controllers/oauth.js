const jwt = require('jsonwebtoken');

exports.oauthSuccess = (req, res) => {
  const user = req.user;
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.redirect(`${process.env.FRONTEND_URL}/home?token=${token}`);
};

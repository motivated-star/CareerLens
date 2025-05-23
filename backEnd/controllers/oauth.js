const jwt = require('jsonwebtoken');

exports.oauthSuccess = (req, res) => {
  const user = req.user;
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Redirect to your frontend with token (adjust URL accordingly)
  res.redirect(`http://localhost:5173?token=${token}`);
};

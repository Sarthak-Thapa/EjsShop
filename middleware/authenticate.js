const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path to your User model

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Access Denied: No Token Provided');
  }

  try {
    const decoded = jwt.verify(token, 'secret'); // Use the same secret key used during token creation
    req.user = await User.findOne({ email: decoded.email });
    if (!req.user) {
      return res.status(401).send('Invalid Token');
    }
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = authenticate; 

const jwt = require('jsonwebtoken');

const islogged = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    // return res.status(401).send("You must be logged in");
    return res.redirect('/user/login')
  }

  try {
    const data = jwt.verify(token, "secret");
    req.user = data;
    console.log('Logged in user:', req.user); // Debug statement
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
}

module.exports = islogged;


const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
// const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const upload = require('../config/multerConfig');
const { route } = require('../routes/productRoutes');


// get signup page

const signUp = (req, res) =>{
  res.render('signUp')
}

//get Login page
const loginPage = (req, res) => {
  res.render('login')
}

//Upload user image


// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single user
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Creating a user
const createUser = async(req, res) =>{
  let{email, password, name, phoneNo, profile} = req.body;
  //encrypt
  if(!(email && password && name && phoneNo)){
      res.status(401).send("Please Fill up all the required fields")
  }else{
      bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, async(err, hash) => { 
          // Store hash in your password DB.
          const user = await User.create({
              name,
              email,
              password: hash,
              phoneNo,
              profile
          })
          let token = jwt.sign({email, userid: user._id}, 'secret')
          res.cookie("token", token)
          res.status(201).json(user);

      });
  });
      
  }
}

const login = async (req, res) => {
  try {
    // Check if email and password are provided
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }

    // Find the user by email
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("User or Password is incorrect");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("User or Password is incorrect");
    }

    // Generate a JWT token
    // let token = jwt.sign({ email: user.email, userid: user._id}, 'secret', { expiresIn: '1h' });
    let token = jwt.sign({ email: user.email, userid: user._id}, 'secret');

    // Set the token as a cookie
    // res.cookie("token", token, { httpOnly: true });
    res.cookie("token", token);
    // Respond with a success message or user data
    // res.status(200).send("Login successful");
    res.redirect('/')
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const logout = async(req, res) => {
  res.cookie("token","")
  res.redirect('/')
}


// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const profile = async (req, res) => {
  try {
    // Ensure req.user is populated correctly
    if (!req.user || !req.user.email) {
      return res.status(400).json({ error: "User information not found" });
    }

    // console.log(req.file);

    let user = await User.findOne({ email: req.user.email });

    // Handle case where the user is not found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(user._id);
    res.render('profile', { user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  signUp,
  loginPage,
  getUsers,
  getUser,
  createUser,
  login,
  logout,
  deleteUser,
  updateUser,
  profile
};

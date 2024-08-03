const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // products: {
  //   type: String
  // }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

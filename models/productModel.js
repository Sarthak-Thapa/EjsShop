// models/productModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String], // Array of image URLs
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  uploadedUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

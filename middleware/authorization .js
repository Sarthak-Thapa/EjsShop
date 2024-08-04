const Product = require('../models/productModel'); // Adjust the path to your Product model

const authorize = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    if (product.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).send('You do not have permission to perform this action');
    }

    req.product = product; // Attach product to request object for further use if needed
    next();
  } catch (error) {
    res.status(400).send('An error occurred');
  }
};

module.exports = authorize;

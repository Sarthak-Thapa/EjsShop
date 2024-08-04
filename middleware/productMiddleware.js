// middlewares/productMiddleware.js
const Product = require('../models/productModel');

const fetchProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.locals.products = products;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// module.exports = fetchProducts;
// middlewares/productMiddleware.js
// const Product = require('../models/productModel');

const fetchProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.locals.product = product; // Attach product to response locals
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    fetchProducts,
    fetchProductById,
};

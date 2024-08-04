const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {
    productForm,
    editProduct,
    myProducts,
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController');
const islogged = require('../middleware/loggedIn')
const { fetchProductById } = require('../middleware/productMiddleware');

//product form route
router.get('/form', productForm);

//update form route
router.get('/update/:id', fetchProductById, (req, res) => {
    res.render('pEdit', { product: res.locals.product }); // Pass the product to the template
});

// Get all Products
router.get('/', getProducts);


// My Product route
router.get('/myproducts', islogged, myProducts);

// Get a single Product
// router.get('/:id', validateObjectId, getProduct);
router.get('/:id', getProduct);

// Post a new Product
router.post('/', islogged, createProduct);


// Delete a Product
// router.delete('/:id', validateObjectId, deleteProduct);
router.get('/delete/:id', deleteProduct);

// Update a Product
// router.patch('/:id', validateObjectId, updateProduct);
router.post('/update/:id', islogged, updateProduct);

module.exports = router;

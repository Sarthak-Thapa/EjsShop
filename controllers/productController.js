//Importing
const Product = require('../models/productModel')
const mongoose = require('mongoose')
const User = require('../models/userModel')

//Controller functions

//Get Product Form
const productForm = (req, res) => {
    res.render('productForm')
}

//Get Edit Form
const editProduct = (req, res) =>{
    res.render('pEdit')
}

// Get My products
const myProducts = async (req, res) => {
    try {
        console.log('Logged in user:', req.user); // Debug statement
        const products = await Product.find({ uploadedUser: req.user.userid });
        console.log('Retrieved products:', products); // Debug statement
        res.render('myProduct', { products });
    } catch (error) {
        res.status(500).send("Error retrieving products");
    }
}




//get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        // res.json(products)
        res.render("AllProducts", { products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





//get a single product
const getProduct = async(req, res) =>{
    const {id} = req.params;

    const product = await Product.findById(id)
    // res.status(200).json(product)
    res.render('productDetails',{product})
}

//create a new product
const createProduct = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        const { name, description, images, price } = req.body;
        const product = await Product.create({
            name, 
            description, 
            images, 
            price,
            uploadedUser: user._id
        });
        // res.status(200).json(product)
        // console.log(product)
        console.log('Created product:', product); // Debug statement
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Trying to add multiple images......
// const createProduct = async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.user.email });
//         const { name, description, price } = req.body;
//         const images = req.body['images[]']; // Adjust to handle array input
//         const product = await Product.create({
//             name, 
//             description, 
//             images, 
//             price,
//             uploadedUser: user._id
//         });
//         console.log('Created product:', product); // Debug statement
//         res.redirect('/');
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }



//Delete a product
const deleteProduct = async(req, res) => {
    const {id} = req.params
    const product = await Product.findByIdAndDelete({_id:id})
    // res.status(200).json(product)
    res.redirect('/product/myproducts')
}

//Update a product
const updateProduct = async(req, res) => {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {new:true})
    res.status(200).json(product)
    // console.log(product)
}

module.exports = {
    productForm,
    editProduct,
    myProducts,
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}
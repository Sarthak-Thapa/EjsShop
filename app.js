// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const productRoutes = require('./routes/productRoutes');
// const userRoutes = require('./routes/userRoutes');
// const path = require('path');
// require('dotenv').config();
// const products = require('./controllers/productController');
// const fetchProducts = require('./middleware/productMiddleware')
// const cookieParser = require('cookie-parser');

// const app = express();

// // Middleware to parse JSON bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // setting up cookie parser
// app.use(cookieParser());

// // Setting up view engine for ejs
// app.set('view engine', 'ejs');


// // Access to public images, static files
// app.use(express.static(path.join(__dirname, 'public')));


// // Use fetchProducts middleware for relevant routes
// app.use(fetchProducts);

// // Routes
// app.use('/product', productRoutes);
// app.use('/user', userRoutes);

// app.get("/", (req, res) => {
//     // res.json({ mssg: "It is working" });
//     res.render('index');
// });

// app.get("/product/update/:id", (req, res) => {
//     // res.json({ mssg: "It is working" });
//     res.render('pEdit', {product});
// });




// // Mongoose Connection
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         app.listen(process.env.PORT, () => {
//             console.log("Listening on localhost:" + process.env.PORT);
//         });
//     })
//     .catch((err) => {
//         console.error("Error connecting to the database", err);
//     });
// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const {fetchProducts} = require('./middleware/productMiddleware')

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting up cookie parser
app.use(cookieParser());

// Setting up view engine for ejs
app.set('view engine', 'ejs');

// Access to public images, static files
app.use(express.static(path.join(__dirname, 'public')));

// Use fetchProducts middleware for relevant routes
app.use(fetchProducts);

// Routes
app.use('/product', productRoutes);
app.use('/user', userRoutes);

app.get("/", (req, res) => {
    res.render('index');
});

// Mongoose Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Listening on localhost:" + process.env.PORT);
        });
    })
    .catch((err) => {
        console.error("Error connecting to the database", err);
    });

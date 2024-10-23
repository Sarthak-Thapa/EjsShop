const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const {fetchProducts} = require('./middleware/productMiddleware')
const swaggerDocs = require ('./utils/swagger')

//testiing git
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

            swaggerDocs(app, port);
        });
    })
    .catch((err) => {
        console.error("Error connecting to the database", err);
    });

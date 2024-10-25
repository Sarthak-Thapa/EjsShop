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
const setupSwagger = require('./utils/swagger')

//testiing git
const app = express();
const port = process.env.PORT

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
// Catch-all 404 handler for API
app.use('/products/*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

setupSwagger(app);

// Serve Swagger JSON (This will now work because 'app' is defined here)
app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });

app.get("/", (req, res) => {
    res.render('index');
});


// Mongoose Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Listening on localhost:" + process.env.PORT);
            console.log(`Docs available at http://localhost:${port}/api-docs`);
            swaggerDocs(app, port);
        });
    })
    .catch((err) => {
        console.error("Error connecting to the database", err);
    });

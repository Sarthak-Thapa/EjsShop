// const { Request, Response } = require('express');
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const { version } = require('../package.json');
// const port = process.env.PORT
// const log = require('console')

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Hamro Gadget APIs',
//       version,
//     },
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         },
//       },
//     },
//   },
//   apis: ['./routes/*.js', './models/*.js'], // Adjust the path if necessary
// };

// const swaggerSpec = swaggerJsdoc(options);

// // Function to expose endpoints
// function swaggerDocs(app, port) {
//   // Swagger page
//   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//   // Docs in JSON format
//   app.get('/docs.json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
//   });

//   log.info(`Docs available at http://localhost:${port}/docs`);
// }

// module.exports = swaggerDocs;

const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

// Load schema files
const productSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '../docs/schemas/productSchema.json')));
const userSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '../docs/schemas/userSchema.json')));

// Load Swagger paths
const productSwagger = JSON.parse(fs.readFileSync(path.join(__dirname, '../docs/productSwagger.json')));
const userSwagger = JSON.parse(fs.readFileSync(path.join(__dirname, '../docs/userSwagger.json')));

// Combine paths and schemas
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    description: 'This is the API documentation for My App',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:8000',
    },
  ],
  paths: {
    ...productSwagger.paths,
    ...userSwagger.paths,
  },
  components: {
    schemas: {
      ...productSchema,
      ...userSchema,
    },
  },
};

// Serve Swagger UI
const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = setupSwagger;

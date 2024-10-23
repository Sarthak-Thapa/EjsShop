const {Express, Request, Response} = require('express')
const swaggerDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const {version} = require('../package.json')

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hamro Gadget APIs',
      version
    },
    components: {
        securitySchemas:{
            bearerAuth:{
                type: "http",
                schema: "bearer",
                bearerFormat: "JWT",
            }
        }
    }
  },
  apis: ['../routes*.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJsDoc(options)

//funtion to exposse endpoints
function swaggerDoc(app: Express, port: number){
    //Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //Docs in Js Format
    app.get("docs.json", (req: Request, res: Response) => {
        res.setHeader("Content_type", "application/json")
        res.send(swaggerSpec);
    })

    log.info(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs

const openapiSpecification = swaggerJsdoc(options);
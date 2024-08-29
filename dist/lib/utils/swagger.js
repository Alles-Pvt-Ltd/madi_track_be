"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const package_json_1 = require("../../package.json");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API FOR GS APP",
            version: package_json_1.version,
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: "http://localhost:3000/",
                description: "Local server"
            },
            {
                url: "<your live url here>",
                description: "Live server"
            },
        ]
    },
    apis: ['../routes/*.ts', '../api/**/*.ts']
};
const SwaggerSpec = swaggerJsdoc(options);
const swaggerDocs = (app, port) => {
    //Swagger Page
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(SwaggerSpec));
    //Docs in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader("content-Type", "application/json");
        res.send(SwaggerSpec);
        console.info("Docs available at port " + port);
    });
};
exports.default = swaggerDocs;

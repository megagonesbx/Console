import swaggerJsdoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
        "title": "Condominium.Console API Service",
        "version": "1.0.0"
    },
    servers: [
        { url: "http://localhost:3000", description: "local" }
    ]
};

const options: OAS3Options = {
    swaggerDefinition,
    apis: ["**/*.ts"]
};

export const openApiConfig = swaggerJsdoc(options);
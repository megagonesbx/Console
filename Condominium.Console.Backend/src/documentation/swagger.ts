import swaggerJsdoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
        "title": "Condominium.Console API Service",
        "version": "1.0.0"
    },
    servers: [
        { url: "http://localhost:3000", description: "local" }
    ],
    components: {
        schemas: {
            ErrorResponse: {
                type: "object",
                required: ["field", "message"],
                properties: {
                    field: { type: "string" },
                    message: {
                        type: "object",
                        required: ["requiredType", "warnings"],
                        properties: {
                            requiredType: { type: "string" },
                            warnings: { type: "warnings" }
                        }
                    }
                }
            },
            UserModel: {
                type: "object",
                required: ["Id", "DisplayName", "Email", "Role", "CreatedAt"],
                properties: {
                    Id: { type: "integer" },
                    DisplayName: { type: "string" },
                    Email: { type: "string" },
                    Role: { type: "integer" },
                    CreatedAt: { type: "date" }
                }
            },
            HouseModel: {
                type: "object",
                required: ["Id", "homeAddress", "ownerName", "ownerDPI", "phoneNumber", "solvent"],
                properties: {
                    Id: { type: "integer" },
                    homeAddress: { type: "string" },
                    ownerName: { type: "string" },
                    ownerDPI: { type: "integer" },
                    phoneNumber: { type: "date" },
                    solvent: { type: "boolean" }
                }
            }
        }
    }
};

const options: OAS3Options = {
    swaggerDefinition,
    apis: ["**/*.ts"]
};

export const openApiConfig = swaggerJsdoc(options);
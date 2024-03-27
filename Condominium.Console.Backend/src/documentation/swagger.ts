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
                required: ["id", "homeAddress", "ownerName", "ownerDPI", "phoneNumber", "solvent"],
                properties: {
                    id: { type: "integer" },
                    homeAddress: { type: "string" },
                    ownerName: { type: "string" },
                    ownerDPI: { type: "integer" },
                    phoneNumber: { type: "date" },
                    solvent: { type: "boolean" }
                }
            },
            DonationModel: {
                type: "object",
                required: ["id", "quantity", "donationPhoto", "description", "utilization"],
                properties: {
                    id: { type: "integer" },
                    quantity: { type: "integer" },
                    donationPhoto: { type: "string" },
                    description: { type: "string" },
                    utilization: { type: "string" }
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
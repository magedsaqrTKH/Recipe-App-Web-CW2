const swaggerJsdoc = require("swagger-jsdoc")

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Recipe API", // API title
      version: "1.0.0", // API version
      description: "Documentation for Recipe Management Axios API", // Description
    },
    servers: [
      {
        url: "http://localhost:3001", // Server URL
        description: "Back-End(Development) server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;

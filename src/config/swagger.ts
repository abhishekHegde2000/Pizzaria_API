import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pizzaria API",
      version: "1.0.0",
      description: "API documentation for the Pizzaria project",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
    ],
  },
  apis: ["./src/routes.ts", "./src/controllers/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;

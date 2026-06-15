import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Programacion 3 - Trabajo Final Integrador",
      version: "Grupo AS",
      description:
        "Micaias Gutierrez, Yamila Ayi, German Cepeda, Emiliana Abril Baglioni, Francisco Daniel Molina",
    },
    tags: [
      {
        name: "Auth",
        description: "Autenticación y generación de tokens JWT",
      },
      {
        name: "Especialidades",
        description: "Gestión de especialidades médicas",
      },
      {
        name: "Obras Sociales",
        description: "Gestión de obras sociales",
      },
      {
        name: "Medicos",
        description: "Gestión de médicos",
      },
      {
        name: "Turnos Reservas",
        description: "Gestión de turnos y reservas",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/rutas/v1/*.js"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
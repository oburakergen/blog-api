import { Config } from '../config';

const swaggerDefinition = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'blog-api API documentation',
      version: '0.0.1',
      description: 'This is a node express mongoose boilerplate in typescript',
      license: {
        name: 'MIT',
        url: 'https://github.com/oburakergen/blog-api.git',
      },
      contact: {
        name: 'Osman Burak ERGEN',
        url: 'https://burakergen.vercel.app/',
        email: 'burak.ergen@outlook.com.tr',
      },
    },
    servers: [
      {
        url: `${Config.url}:${Config.port}`,
        description: 'Development Server',
      },
    ],
  },
  apis: ['../routes/*.ts'],
};

export default swaggerDefinition;

import { Routes } from '../interfaces/routes.interface';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from '../utils/swagger';
import { Router } from 'express';

class SwaggerRoute implements Routes {
  public path = '/swagger';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, swaggerUi.setup(swaggerJsdoc(swaggerDefinition)));
  }
}

export default SwaggerRoute;

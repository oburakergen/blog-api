import { Routes } from '../interfaces/routes.interface';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from '../utils/swagger';
import { Router, type Request, type Response } from 'express';

class SwaggerRoute implements Routes {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const specs = swaggerJsdoc(swaggerDefinition);

    this.router.get('/', (req: Request, res: Response) => {
      res.render('index', { title: 'Express' });
    });
    this.router.get(
      `${this.path}api-docs`,
      swaggerUi.serve,
      swaggerUi.setup(specs, {
        explorer: true,
      }),
    );
  }
}

export default SwaggerRoute;

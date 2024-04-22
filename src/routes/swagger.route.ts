import { Routes } from '../interfaces/routes.interface';
import swaggerUi from 'swagger-ui-express';
import { Router, type Request, type Response } from 'express';
import yaml from 'yamljs';
import path from 'path';

class SwaggerRoute implements Routes {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const specs = yaml.load(path.join(__dirname, '../../openapi.yml'));

    this.router.get('/', (req: Request, res: Response) => {
      res.render('index', { title: 'Express' });
    });
    this.router.use(`${this.path}docs`, swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
  }
}

export default SwaggerRoute;

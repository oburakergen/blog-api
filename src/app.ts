import express, { Application } from 'express';
import { Config } from './config';
import { Routes } from '@interfaces/routes.interface';

class App {
  public app: Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = Config.nodeEnv;
    this.port = Config.port;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: any[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}

export default App;

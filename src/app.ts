import express, { Application } from 'express';
import { Config } from './config';
import type { Routes } from './interfaces/routes.interface';
import logger from './utils/logger';
import { connect, connection } from 'mongoose';
import morgan from './utils/morgan';

class App {
  protected app: Application;
  protected env: string;
  protected url: string;
  protected port: string | number;
  protected mongoUrl: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = Config.nodeEnv;
    this.port = Config.port;
    this.url = Config.url;
    this.mongoUrl = Config.mongoUri;

    this.initializeMongoDB()
      .then(() => {
        logger.info('Connected to MongoDB');
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
      })
      .catch(async error => {
        logger.error(`Error connecting to MongoDB: ${error}`);
        await connection.destroy();
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`App listening on the port ${this.url}:${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan.successHandler);
    this.app.use(morgan.errorHandler);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async initializeMongoDB() {
    try {
      await connect(this.mongoUrl);
    } catch (error) {
      logger.error(`Error connecting to MongoDB: ${error}`);
    }
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}

export default App;

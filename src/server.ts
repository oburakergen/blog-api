import App from './app';
import BlogRoute from './routes/blog.route';

const routes = [new BlogRoute()];

try {
  const app = new App(routes);
  app.listen();
} catch (error) {
  console.error(`Error starting server: ${error}`);
  process.exit(1);
}

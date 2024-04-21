import App from './app';
import BlogRoute from './routes/blog.route';
import CategoryRoute from './routes/category.route';

const routes = [new BlogRoute(), new CategoryRoute()];

try {
  const app = new App(routes);
  app.listen();
} catch (error) {
  console.error(`Error starting server: ${error}`);
  process.exit(1);
}

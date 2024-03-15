import App from './app';
import BlogRoute from '@routes/blog.route';

const app = new App([new BlogRoute()]);

app.listen();

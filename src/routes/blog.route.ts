import { Router } from 'express';
import BlogController from '../controllers/blog.controller';
import { Routes } from '../interfaces/routes.interface';

class BlogRoute implements Routes {
  public path = '/blogs';
  public router = Router();
  public blogController = new BlogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.blogController.getBlogs);
    this.router.get(`${this.path}/:id`, this.blogController.getBlogById);
    this.router.post(`${this.path}`, this.blogController.createBlog);
    this.router.put(`${this.path}/:id`, this.blogController.updateBlog);
    this.router.delete(`${this.path}/:id`, this.blogController.deleteBlog);
  }
}

export default BlogRoute;

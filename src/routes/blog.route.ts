import { Router } from 'express';
import BlogController from '@/controllers/blog.controller';
import { Routes } from '@/interfaces/routes.interface';

class BlogRoute implements Routes {
  public path = '/blogs';
  public router = Router();
  public indexController = new BlogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.getBlogs);
    this.router.get(`${this.path}/:id`, this.indexController.getBlogById);
    this.router.post(`${this.path}`, this.indexController.createBlog);
    this.router.put(`${this.path}/:id`, this.indexController.updateBlog);
    this.router.delete(`${this.path}/:id`, this.indexController.deleteBlog);
  }
}

export default BlogRoute;

import type { Request, Response } from 'express';
import BlogService from '../services/blog.service';
import { success, error } from '../utils/response';

class BlogController {
  protected blogService = new BlogService();

  public getBlogs = async (req: Request, res: Response) => {
    try {
      const blogs = await this.blogService.findAll();

      return success(res, blogs);
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };

  public getBlogById = async (req: Request, res: Response) => {
    try {
      const blogId = req.params.id;
      const blog = await this.blogService.findById(blogId);

      return success(res, blog);
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };

  public createBlog = async (req: Request, res: Response) => {
    try {
      const requests = req.body;
      const createdBlogData = await this.blogService.create(requests);

      return success(res, createdBlogData);
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };

  public updateBlog = async (req: Request, res: Response) => {
    try {
      const blogId = req.params.id;
      const requests = req.body;
      const updatedBlogData = await this.blogService.update(blogId, requests);

      return success(res, updatedBlogData);
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };

  public deleteBlog = async (req: Request, res: Response) => {
    try {
      const blogId = req.params.id;
      await this.blogService.delete(blogId);

      return success(res, 'Category deleted successfully!');
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };
}

export default BlogController;

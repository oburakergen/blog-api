import type { NextFunction, Request, Response } from 'express';
import BlogService from '../services/blogs.service';
import { success } from '../utils/response';

class BlogsController {
  protected blogService = new BlogService();

  public getBlogs = async (req: Request, res: Response) => {
    try {
      const blogs = await this.blogService.findAllBlogs();

      return success(res, blogs);
    } catch (error) {
      return error(res, error.message, 500);
    }
  };

  public getBlogById = async (req: Request, res: Response) => {
    try {
      const blogId = Number(req.params.id);
      const blog = await this.blogService.findBlogById(blogId);

      return success(res, blog);
    } catch (error) {
      return error(res, error.message, 500);
    }
  };

  public createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogData = req.body;
      const createdBlogData = await this.blogService.createBlog(blogData);
      res.status(201).json({ data: createdBlogData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = Number(req.params.id);
      const blogData = req.body;
      const updatedBlogData = await this.blogService.updateBlog(blogId, blogData);
      res.status(200).json({ data: updatedBlogData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = Number(req.params.id);
      const deleteBlogData = await this.blogService.deleteBlog(blogId);

      res.status(200).json({ data: deleteBlogData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default BlogsController;

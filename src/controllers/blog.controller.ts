import type { NextFunction, Request, Response } from 'express';
import BlogService from '@/services/blogs.service';

class BlogsController {
  protected blogService: BlogService;

  public getBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogs = await this.blogService.findAllBlogs();
      res.status(200).json({ data: blogs, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBlogById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = Number(req.params.id);
      const blog = await this.blogService.findBlogById(blogId);
      res.status(200).json({ data: blog, message: 'findOne' });
    } catch (error) {
      next(error);
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

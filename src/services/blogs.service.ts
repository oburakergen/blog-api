import { BlogCreate } from '../dtos/blog.dto';
import { HttpException } from '../exceptions/HttpException';
import blogModel from '../models/blogs.model';
import slugify from 'slugify';

class BlogService {
  private blogs = blogModel;

  public async findAllBlogs(): Promise<BlogCreate[]> {
    const blogs = await this.blogs.find();

    return blogs;
  }

  public async createBlog(blogData: BlogCreate) {
    await this.blogs.create({
      ...blogData,
      slug: slugify(blogData.title, {
        replacement: '-',
      }),
    });

    return blogData;
  }

  public async findBlogById(blogId: number) {
    const findBlog = this.blogs.findOne({ where: { id: blogId } });
    if (!findBlog) throw new HttpException(409, "You're not a blog");

    return findBlog;
  }

  public async updateBlog(blogId: number, blogData) {
    // Logic to update a blog
    const findBlog = this.blogs.findOne({ where: { id: blogId } });
    if (!findBlog) throw new HttpException(409, "You're not a blog");

    await findBlog.updateOne({ where: { id: blogId }, ...blogData });

    return findBlog;
  }

  public async deleteBlog(blogId: number) {
    const findBlog = this.blogs.findOne({ where: { id: blogId } });
    if (!findBlog) throw new HttpException(409, "You're not a blog");

    await findBlog.deleteOne({ where: { id: blogId } });

    return findBlog;
  }
}

export default BlogService;

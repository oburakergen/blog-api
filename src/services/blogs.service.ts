import { BlogCreateDto } from '@/dtos/create-blog.dto';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';
import blogModel from '@/models/blogs.model';
import slugify from 'slugify';

class BlogService {
  private blogs = blogModel;

  public async createBlog(blogData: BlogCreateDto) {
    if (isEmpty(blogData)) throw new HttpException(400, 'blogData is empty');
    await this.blogs.create({
      ...blogData,
      slug: slugify(blogData.title, {
        replacement: '-',
      }),
    });

    return blogData;
  }

  public async findAllBlogs() {
    const blogs = await this.blogs.find();

    return blogs;
  }

  public async findBlogById(blogId: number) {
    // Logic to find a blvog by id
  }

  public async updateBlog(blogId: number, blogData: BlogCreateDto) {
    // Logic to update a blog
  }

  public async deleteBlog(blogId: number) {
    // Logic to delete a blog
  }
}

export default BlogService;

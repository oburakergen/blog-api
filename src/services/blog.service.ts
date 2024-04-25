import blogModel from '../models/blog.model';
import { BlogCreate } from '../dtos/blog.dto';
import slugify from 'slugify';
import { HttpException } from '../exceptions/HttpException';
import { ObjectId } from 'mongodb';
import { AwsS3 } from '../utils/aws';

class BlogService {
  private blogs = blogModel;

  public async findAll() {
    return this.blogs.find();
  }

  public async findById(id: string) {
    return this.blogs.findById(new ObjectId(id));
  }

  public async create(data: BlogCreate) {
    const slug = slugify(data.title, {
      replacement: '-',
    });

    const isExist = await this.blogs.findOne({ slug });
    if (isExist) throw new HttpException(409, `Blog with slug ${slug} already exists`);

    if (data.photo) {
      const s3 = new AwsS3();

      const type = data.photo.originalname.split('.').pop();
      const originalName = slug + '.' + type;

      data.photo = await s3.uploadFile(originalName, data.photo.buffer, data.photo.mimetype);
    }

    return this.blogs.create({
      ...data,
      slug,
    });
  }

  public async update(id: string, data: BlogCreate) {
    const objectId = new ObjectId(id);
    const slug = slugify(data.title, {
      replacement: '-',
    });
    const isExist = await this.blogs.findOne({ slug, _id: { $ne: objectId } });
    if (isExist) throw new HttpException(409, `Blog with slug ${slug} already exists`);
    const item = await this.blogs.findById(objectId);

    if (data.photo && data.photo.buffer) {
      const s3 = new AwsS3();
      const type = data.photo.originalname.split('.').pop();
      const originalName = slug + '.' + type;

      if (item.photo) {
        await s3.deleteFile(item.photo.split('/').pop());
      }

      data.photo = await s3.uploadFile(originalName, data.photo.buffer, data.photo.mimetype);
    }

    await this.blogs.findByIdAndUpdate(
      objectId,
      {
        ...data,
        slug,
      },
      { new: false },
    );
    if (!item) throw new HttpException(409, `Blog with id ${id} not found`);

    return item;
  }

  public async delete(id: string) {
    const item = await this.blogs.findByIdAndDelete(new ObjectId(id));

    if (!item) throw new HttpException(409, `Blog with id ${id} not found`);

    if (item.photo) {
      const s3 = new AwsS3();
      await s3.deleteFile(item.photo.split('/').pop());
    }

    return item;
  }
}

export default BlogService;

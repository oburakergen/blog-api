import categoryModel from '../models/category.model';
import { CategoryCreate } from '../dtos/category.dto';
import slugify from 'slugify';
import { HttpException } from '../exceptions/HttpException';
import { ObjectId } from 'mongodb';
import { AwsS3 } from '../utils/aws';

class CategoryService {
  private categories = categoryModel;

  public async findAll() {
    return this.categories.find();
  }

  public async findById(id: string) {
    return this.categories.findById(new ObjectId(id));
  }

  public async create(data: CategoryCreate) {
    const slug = slugify(data.title, {
      replacement: '-',
    });
    let parentId = null;

    try {
      parentId = data.parentId ? await this.categories.findById(new ObjectId(data.parentId)) : null;
    } catch (error) {
      parentId = null;
    }

    delete data.parentId;

    const isExist = await this.categories.findOne({ slug });
    if (isExist) throw new HttpException(409, `Category with slug ${slug} already exists`);

    if (data.photo) {
      const s3 = new AwsS3();

      const type = data.photo.originalname.split('.').pop();
      const originalName = slug + '.' + type;

      data.photo = await s3.uploadFile(originalName, data.photo.buffer, data.photo.mimetype);
    }

    return this.categories.create({
      ...data,
      slug,
      parentId,
    });
  }

  public async update(id: string, data: CategoryCreate) {
    const objectId = new ObjectId(id);
    const slug = slugify(data.title, {
      replacement: '-',
    });
    let parentId = null;
    const isExist = await this.categories.findOne({ slug, _id: { $ne: objectId } });
    if (isExist) throw new HttpException(409, `Tag with slug ${slug} already exists`);
    const item = await this.categories.findById(objectId);

    try {
      parentId = data.parentId ? await this.categories.findById(new ObjectId(data.parentId)) : null;
    } catch (error) {
      parentId = null;
    }

    if (data.photo && data.photo.buffer) {
      const s3 = new AwsS3();
      const type = data.photo.originalname.split('.').pop();
      const originalName = slug + '.' + type;

      if (item.photo) {
        console.log(item.photo);
        await s3.deleteFile(item.photo.split('/').pop());
      }

      data.photo = await s3.uploadFile(originalName, data.photo.buffer, data.photo.mimetype);
    }

    await this.categories.findByIdAndUpdate(
      objectId,
      {
        ...data,
        slug,
        parentId,
      },
      { new: false },
    );
    if (!item) throw new HttpException(409, `Category with id ${id} not found`);

    return item;
  }

  public async delete(id: string) {
    const item = await this.categories.findByIdAndDelete(new ObjectId(id));

    if (!item) throw new HttpException(409, `Category with id ${id} not found`);

    if (item.photo) {
      const s3 = new AwsS3();
      await s3.deleteFile(item.photo.split('/').pop());
    }

    return item;
  }
}

export default CategoryService;

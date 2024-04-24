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

    const parentId = await this.categories.findById(new ObjectId(data.parentId));
    const isExist = await this.categories.findOne({ slug });
    if (isExist) throw new HttpException(409, `Tag with slug ${slug} already exists`);

    delete data.parentId;

    if (data.photo) {
      try {
        const s3 = new AwsS3();

        const photoUrl = await s3.uploadFile('bucket', 'key', data.photo.path);

        console.log(photoUrl);

        data.photo = photoUrl;
      } catch (err) {
        throw new HttpException(500, 'Failed to upload photo');
      }
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
    const isExist = await this.categories.findOne({ slug, _id: { $ne: objectId } });
    if (isExist) throw new HttpException(409, `Tag with slug ${slug} already exists`);

    const item = await this.categories.findByIdAndUpdate(
      id,
      {
        ...data,
        slug,
      },
      { new: false },
    );
    if (!item) throw new HttpException(409, `Tag with id ${id} not found`);

    return item;
  }

  public async delete(id: string) {
    const item = await this.categories.findByIdAndDelete(new ObjectId(id));

    if (!item) throw new HttpException(409, `Tag with id ${id} not found`);

    return item;
  }
}

export default CategoryService;

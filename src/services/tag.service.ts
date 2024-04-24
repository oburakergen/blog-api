import tagModel from '../models/tag.model';
import { TagCreate } from '../dtos/tag.dto';
import slugify from 'slugify';
import { HttpException } from '../exceptions/HttpException';
import { ObjectId } from 'mongodb';

class TagService {
  private tags = tagModel;

  public async findAll() {
    return this.tags.find();
  }

  public async findById(id: string) {
    return this.tags.findById(new ObjectId(id));
  }

  public async create(data: TagCreate) {
    const slug = slugify(data.title, {
      replacement: '-',
    });

    const isExist = await this.tags.findOne({ slug });
    if (isExist) throw new HttpException(409, `Tag with slug ${slug} already exists`);

    return this.tags.create({
      ...data,
      slug,
    });
  }

  public async update(id: string, data: TagCreate) {
    const objectId = new ObjectId(id);
    const slug = slugify(data.title, {
      replacement: '-',
    });
    const isExist = await this.tags.findOne({ slug, _id: { $ne: objectId } });
    if (isExist) throw new HttpException(409, `Tag with slug ${slug} already exists`);

    const item = await this.tags.findByIdAndUpdate(
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
    const item = await this.tags.findByIdAndDelete(new ObjectId(id));

    if (!item) throw new HttpException(409, `Tag with id ${id} not found`);

    return item;
  }
}

export default TagService;

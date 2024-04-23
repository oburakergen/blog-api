import tagModel from '../models/tag.model';
import { TagCreate } from '../dtos/tag.dto';
import slugify from 'slugify';
import { HttpException } from '../exceptions/HttpException';

class TagService {
  private tags = tagModel;

  public async findAll() {
    const items = await this.tags.find();

    return items;
  }

  public async findById(id: number) {
    const item = await this.tags.findById(id);

    return item;
  }

  public async create(data: TagCreate) {
    await this.tags.create({
      ...data,
      slug: slugify(data.title, {
        replacement: '-',
      }),
    });

    return data;
  }

  public async update(id: number, data: TagCreate) {
    await this.tags.findByIdAndUpdate(id, {
      ...data,
      slug: slugify(data.title, {
        replacement: '-',
      }),
    });

    return data;
  }

  public async delete(id: number) {
    const findBlog = this.tags.findOne({ where: { id } });
    if (!findBlog) throw new HttpException(409, "You're not a tag");

    await findBlog.deleteOne({ where: { id } });

    return findBlog;
  }
}

export default TagService;

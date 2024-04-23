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

  public async findById(id: string) {
    const item = await this.tags.findById(id);

    return item;
  }

  public async create(data: TagCreate) {
    const slug = slugify(data.title, {
      replacement: '-',
    });

    const isExist = await this.tags.findOne({ slug });
    if (isExist) throw new HttpException(409, `Tag with slug ${slug} already exists`);

    await this.tags.create({
      ...data,
      slug: slugify(data.title, {
        replacement: '-',
      }),
    });

    return data;
  }

  public async update(id: string, data: TagCreate) {
    const item = await this.tags.findByIdAndUpdate(
      id,
      {
        ...data,
        slug: slugify(data.title, {
          replacement: '-',
        }),
      },
      { new: false },
    );

    if (!item) throw new HttpException(409, `Tag with id ${id} not found`);

    return item;
  }

  public async delete(id: string) {
    const findBlog = this.tags.findById(id);
    if (!findBlog) throw new HttpException(409, "You're not a tag");

    await findBlog.deleteOne({ id });

    return findBlog;
  }
}

export default TagService;

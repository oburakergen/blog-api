import categoryModel from '../models/blogs.model';
import { CategoryCreate } from '../dtos/category.dto';
import slugify from 'slugify';
import { HttpException } from '../exceptions/HttpException';

class CategoryService {
  private categories = categoryModel;

  public async findAllCategories() {
    const categories = await this.categories.find();

    return categories;
  }

  public async findCategoryById(categoryId: number) {
    const category = await this.categories.findById(categoryId);

    return category;
  }

  public async createCategory(categoryData: CategoryCreate) {
    await this.categories.create({
      ...categoryData,
      slug: slugify(categoryData.title, {
        replacement: '-',
      }),
    });

    return categoryData;
  }

  public async updateCategory(categoryId: number, categoryData: CategoryCreate) {
    await this.categories.findByIdAndUpdate(categoryId, {
      ...categoryData,
      slug: slugify(categoryData.title, {
        replacement: '-',
      }),
    });

    return categoryData;
  }

  public async deleteCategory(blogId: number) {
    const findBlog = this.categories.findOne({ where: { id: blogId } });
    if (!findBlog) throw new HttpException(409, "You're not a category");

    await findBlog.deleteOne({ where: { id: blogId } });

    return findBlog;
  }
}

export default CategoryService;

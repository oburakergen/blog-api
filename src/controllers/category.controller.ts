import type { Request, Response } from 'express';
import CategoryService from '../services/category.service';
import { success, error } from '../utils/response';

class CategoryController {
  protected categoryService = new CategoryService();

  public getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoryService.findAll();

      return success(res, categories);
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };

  public getCategoryById = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
      const category = await this.categoryService.findById(categoryId);

      return success(res, category);
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };

  public createCategory = async (req: Request, res: Response) => {
    try {
      const requests = req.body;
      const createdCategoryData = await this.categoryService.create(requests);

      return success(res, createdCategoryData);
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };

  public updateCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
      const requests = req.body;
      const updatedCategoryData = await this.categoryService.update(categoryId, requests);

      return success(res, updatedCategoryData);
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };

  public deleteCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
      await this.categoryService.delete(categoryId);

      return success(res, 'Category deleted successfully!');
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };
}

export default CategoryController;

import CategoryService from '../services/category.service';
import { success, error } from '../utils/response';
import type { Request, Response } from 'express';

class CategoryController {
  protected categoryService = new CategoryService();

  public getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoryService.findAllCategories();

      return success(res, categories);
    } catch (err) {
      return error(res, err.message, 500);
    }
  };

  public getCategoryById = async (req: Request, res: Response) => {
    try {
      const categoryId = Number(req.params.id);
      const category = await this.categoryService.findCategoryById(categoryId);

      return success(res, category);
    } catch (err) {
      return error(res, err.message, 500);
    }
  };

  public createCategory = async (req: Request, res: Response) => {
    try {
      const categoryData = req.body;
      const createdCategoryData = await this.categoryService.createCategory(categoryData);

      res.status(201).json({ data: createdCategoryData, message: 'created' });
    } catch (err) {
      return error(res, err.message, 500);
    }
  };

  public updateCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = Number(req.params.id);
      const categoryData = req.body;
      const updatedCategoryData = await this.categoryService.updateCategory(categoryId, categoryData);
      res.status(200).json({ data: updatedCategoryData, message: 'updated' });
    } catch (err) {
      return error(res, err.message, 500);
    }
  };

  public deleteCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = Number(req.params.id);
      const deleteCategoryData = await this.categoryService.deleteCategory(categoryId);

      res.status(200).json({ data: deleteCategoryData, message: 'deleted' });
    } catch (err) {
      return error(res, err.message, 500);
    }
  };
}

export default CategoryController;

import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import CategoryController from '../controllers/category.controller';
import { validateData } from '../middlewares/validation.middleware';
import { createCategorySchema } from '../dtos/category.dto';

class CategoryRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public categoryController = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categoryController.getCategories);
    this.router.get(`${this.path}/:id`, this.categoryController.getCategoryById);
    this.router.post(`${this.path}`, validateData(createCategorySchema), this.categoryController.createCategory);
    this.router.put(`${this.path}/:id`, this.categoryController.updateCategory);
    this.router.delete(`${this.path}/:id`, this.categoryController.deleteCategory);
  }
}

export default CategoryRoute;

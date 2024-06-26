import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import CategoryController from '../controllers/category.controller';
import { validateData } from '../middlewares/validation.middleware';
import { createCategorySchema, updateCategorySchema } from '../dtos/category.dto';
import multer from 'multer';
import { MAX_FILE_SIZE } from '../interfaces/global.interface';

class CategoryRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public categoryController = new CategoryController();
  public multer: multer.Multer;

  constructor() {
    this.multer = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
    });
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categoryController.getCategories);
    this.router.get(`${this.path}/:id`, this.categoryController.getCategoryById);
    this.router.post(`${this.path}`, [this.multer.single('photo'), validateData(createCategorySchema)], this.categoryController.createCategory);
    this.router.put(`${this.path}/:id`, [this.multer.single('photo'), validateData(updateCategorySchema)], this.categoryController.updateCategory);
    this.router.delete(`${this.path}/:id`, this.categoryController.deleteCategory);
  }
}

export default CategoryRoute;

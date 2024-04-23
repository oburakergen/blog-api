import { Router } from 'express';
import TagController from '../controllers/tag.controller';
import { Routes } from '../interfaces/routes.interface';
import { validateData } from '../middlewares/validation.middleware';
import { createTagSchema } from '../dtos/tag.dto';
import multer from 'multer';

class TagRoute implements Routes {
  public path = '/tags';
  public router = Router();
  public tagController = new TagController();
  public multer: multer.Multer;

  constructor() {
    this.multer = multer();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.tagController.getTags);
    this.router.get(`${this.path}/:id`, this.tagController.getTagById);
    this.router.post(`${this.path}`, [this.multer.none(), validateData(createTagSchema)], this.tagController.createTag);
    this.router.put(`${this.path}/:id`, this.tagController.updateTag);
    this.router.delete(`${this.path}/:id`, this.tagController.deleteTag);
  }
}

export default TagRoute;

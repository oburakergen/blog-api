import type { Request, Response } from 'express';
import TagService from '../services/tag.service';
import { success, error } from '../utils/response';

class BlogsController {
  protected tagService = new TagService();

  public getTags = async (req: Request, res: Response) => {
    try {
      const tags = await this.tagService.findAll();

      return success(res, tags);
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };

  public getTagById = async (req: Request, res: Response) => {
    try {
      const tagId = req.params.id;
      const tag = await this.tagService.findById(tagId);

      return success(res, tag);
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };

  public createTag = async (req: Request, res: Response) => {
    try {
      const requests = req.body;
      const createdTagData = await this.tagService.create(requests);

      return success(res, createdTagData);
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };

  public updateTag = async (req: Request, res: Response) => {
    try {
      const tagId = req.params.id;
      const requests = req.body;
      const updatedTagData = await this.tagService.update(tagId, requests);
      return success(res, updatedTagData);
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };

  public deleteTag = async (req: Request, res: Response) => {
    try {
      const tagId = req.params.id;
      await this.tagService.delete(tagId);

      return success(res, 'Tag deleted successfully!');
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };
}

export default BlogsController;

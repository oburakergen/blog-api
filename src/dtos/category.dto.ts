import { ICategory } from '../interfaces/category.interface';
import { z } from 'zod';

export type CategoryCreate = Pick<ICategory, 'title' | 'slug'>;

export const createCategorySchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().optional(),
  photo: z
    .object({
      fieldname: z.string(),
      originalname: z.string(),
      encoding: z.string(),
      mimetype: z.string(),
      destination: z.string(),
      filename: z.string(),
      path: z.string(),
      size: z.number(),
    })
    .optional(),
  active: z.enum(['active', 'inactive']).default('active'),
  createdAt: z.date().default(() => new Date()),
  parentCategory: z.string().optional(),
});

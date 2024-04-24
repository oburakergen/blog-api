import { ICategory } from '../interfaces/category.interface';
import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../interfaces/global.interface';

export type CategoryCreate = Pick<ICategory, 'title' | 'slug' | 'parentId' | 'photo'>;

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
    .refine(
      files => {
        files.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(files.mimetype);
      },
      {
        message: 'Invalid file type or size',
      },
    )
    .optional(),
  status: z.enum(['active', 'inactive']).default('active'),
  parentId: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const updateCategorySchema = z.object({
  title: z.string().min(3).max(255).optional(),
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
    .refine(
      files => {
        files.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(files.mimetype);
      },
      {
        message: 'Invalid file type or size',
      },
    )
    .optional(),
  status: z.enum(['active', 'inactive']).optional(),
  parentId: z.string().optional(),
  updatedAt: z.date().default(() => new Date()),
});

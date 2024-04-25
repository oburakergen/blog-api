import { IBlog } from '../interfaces/blogs.interface';
import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../interfaces/global.interface';

export type BlogCreate = Pick<IBlog, 'title' | 'slug' | 'content' | 'tags' | 'photo' | 'category'>;

export const createBlogSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string(),
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
  status: z.enum(['published', 'draft', 'deleted']).default('published'),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

import { IBlog } from '../interfaces/blogs.interface';
import { z } from 'zod';

export type BlogCreate = Pick<IBlog, 'title' | 'slug' | 'content' | 'tags'>;

export const createBlogSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string(),
  tags: z.array(z.string()).optional(),
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
});

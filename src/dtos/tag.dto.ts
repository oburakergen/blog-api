import { ITag } from '../interfaces/tags.interface';
import { z } from 'zod';

export type TagCreate = Pick<ITag, 'title' | 'createdAt'>;

export const createTagSchema = z.object({
  title: z.string().min(3).max(255),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const updateTagSchema = z.object({
  title: z.string().min(3).max(255),
  updatedAt: z.date().default(() => new Date()),
});

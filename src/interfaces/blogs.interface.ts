import { Status } from './global.interface';
import { Category } from '../models/categories.model';
import { Tag } from '../models/tag.model';

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  photo: string;
  active: Status;
  createdAt: Date;
  category: Category;
  tags: Tag[];
}

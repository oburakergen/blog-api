import { Status } from './global.interface';
import { Category } from '../models/category.model';
import { Tag } from '../models/tag.model';

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  photo: any;
  active: Status;
  category: Category;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}

import { Status } from './global.interface';

export interface ICategory {
  title: string;
  slug: string;
  description: string | null;
  photo: string | null;
  parentId: string | null;
  status: Status;
  createdAt: Date;
}

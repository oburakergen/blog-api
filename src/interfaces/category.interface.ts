import { Status } from './global.interface';

export interface ICategory {
  title: string;
  slug: string;
  description: string | null;
  photo: any;
  parentId: string | null;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

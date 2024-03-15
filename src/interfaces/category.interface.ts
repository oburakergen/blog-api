import { Status } from '@/interfaces/global.interface';

export interface ICategory {
  title: string;
  slug: string;
  description: string | null;
  photo: string | null;
  active: Status;
  createdAt: Date;
}

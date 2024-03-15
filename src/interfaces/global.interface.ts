import { Types } from 'mongoose';

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type ID = Types.ObjectId | string;

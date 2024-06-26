import { Types } from 'mongoose';

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type ID = Types.ObjectId | string;
export const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

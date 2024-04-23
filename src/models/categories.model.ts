import { model, Schema, Document } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';
import { Status } from '../interfaces/global.interface';
import { DOCUMENT_NAME, COLLECTION_NAME } from '../constants/db.constant';

export interface Category extends ICategory, Document {}

const schema = new Schema<Category>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
  },
  status: {
    type: String,
    enum: Object.values(Status),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
});

const categoryModel = model<Category>(DOCUMENT_NAME.Category, schema, COLLECTION_NAME.Category);

export default categoryModel;

import { model, Schema, Document } from 'mongoose';
import { IBlog } from '@/interfaces/blogs.interface';
import { Status } from '@/interfaces/global.interface';
import { DOCUMENT_NAME, COLLECTION_NAME } from '@/constants/db.constant';

export interface Blog extends IBlog, Document {}

const schema = new Schema<Blog>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  active: {
    type: String,
    enum: Object.values(Status),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: DOCUMENT_NAME.Category,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.Tag,
    },
  ],
});

const categoryModel = model<Blog>(DOCUMENT_NAME.Blog, schema, COLLECTION_NAME.Blog);

export default categoryModel;

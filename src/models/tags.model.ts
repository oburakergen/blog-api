import { model, Schema, Document } from 'mongoose';
import { ITag } from '@/interfaces/tags.interface';
import { DOCUMENT_NAME, COLLECTION_NAME } from '@/constants/db.constant';

export interface Tag extends ITag, Document {}

const schema = new Schema<Tag>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const tagModel = model<Tag>(DOCUMENT_NAME.Tag, schema, COLLECTION_NAME.Tag);

export default tagModel;

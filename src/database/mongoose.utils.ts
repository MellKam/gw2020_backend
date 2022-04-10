import { Document, Schema } from 'mongoose';

export type MongooseDoc<T> = T & Document;
export const MongooseObjectId = Schema.Types.ObjectId;

import { Schema, Types, Document } from 'mongoose';

export const SchemaObjectId = Schema.Types.ObjectId;
export const TypesObjectId = Types.ObjectId;
export type ObjectIdType = Types.ObjectId;

export type MongoDocument<T> = T & Document;

export const DocReset = { _id: 0, __v: 0 };

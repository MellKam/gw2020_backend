import { Schema as MongooseSchema, Types, Document, Error } from 'mongoose';

export const SchemaObjectId = MongooseSchema.Types.ObjectId;
export const Schema = MongooseSchema;
export const MongoObjectId = Types.ObjectId;
export type ObjectIdType = Types.ObjectId;

export type MongoDocument<T> = T & Document;

export const MongooseValidationError = Error.ValidationError;

export const DocReset = { _id: 0, __v: 0 };

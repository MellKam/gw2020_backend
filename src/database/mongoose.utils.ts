import { Schema, Types, Document } from 'mongoose';
import { ClientSession as MongodbClientSession } from 'mongodb';

export const SchemaObjectId = Schema.Types.ObjectId;
export const TypesObjectId = Types.ObjectId;
export type ObjectIdType = Types.ObjectId;
export type ClientSession = MongodbClientSession;

export type MongoDocument<T> = T & Document;

export const DocReset = { _id: 0, __v: 0 };

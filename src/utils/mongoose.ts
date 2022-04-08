import mongoose, { Document } from 'mongoose';

export type MongooseDoc<Schema> = Schema & Document;
export const MongooseObjectId = mongoose.Schema.Types.ObjectId;

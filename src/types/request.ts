import { Request } from 'express';
import { ClientSession } from 'mongodb';

export type ReqWithMongoSession = Request & { dbSession: ClientSession };

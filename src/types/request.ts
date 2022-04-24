import { Request } from 'express';
import { ClientSession } from '../database/mongoose.utils';

export interface AppReq extends Request {
	dbSession?: ClientSession;
}

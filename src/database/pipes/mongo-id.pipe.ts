import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class MongoIdPipe implements PipeTransform<any> {
	transform(value: any) {
		if (!Types.ObjectId.isValid(value)) {
			throw new BadRequestException('Invalid ObjectId');
		}
		return value;
	}
}

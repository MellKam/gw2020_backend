import { PipeTransform, BadRequestException } from '@nestjs/common';
import { MongoObjectId } from '../mongoose.utils';

export class MongoIdPipe implements PipeTransform {
	transform(value: string) {
		if (!MongoObjectId.isValid(value)) {
			throw new BadRequestException('Invalid ObjectId');
		}
		return value;
	}
}

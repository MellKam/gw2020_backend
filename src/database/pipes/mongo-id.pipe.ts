import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TypesObjectId } from '../mongoose.utils';

export class MongoIdPipe implements PipeTransform<any> {
	transform(value: any) {
		if (!TypesObjectId.isValid(value)) {
			throw new BadRequestException('Invalid ObjectId');
		}
		return value;
	}
}

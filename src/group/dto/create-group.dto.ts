import { IsMongoId, IsNumber, IsString, MinLength } from 'class-validator';
import { ObjectIdType } from '../../database/mongoose.utils';

export class CreateGroupDto {
	@IsString()
	@MinLength(8)
	readonly master: string;

	@IsNumber()
	readonly number: number;

	@IsMongoId()
	readonly specification: ObjectIdType;
}

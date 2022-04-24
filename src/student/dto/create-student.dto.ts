import { IsDefined, IsMongoId, IsString, MinLength } from 'class-validator';
import { ObjectIdType } from '../../database/mongoose.utils';

export class CreateStudentDto {
	@IsDefined()
	@IsString()
	@MinLength(8)
	readonly full_name: string;

	@IsDefined()
	@IsMongoId()
	readonly group: ObjectIdType;
}

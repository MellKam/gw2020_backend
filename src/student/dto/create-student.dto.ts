import { Type } from 'class-transformer';
import {
	IsDefined,
	IsMongoId,
	IsOptional,
	IsString,
	MinLength,
	ValidateNested,
} from 'class-validator';
import { ObjectIdType } from '../../database/mongoose.utils';
import { CreateGWDto } from './create-gw.dto';

export class CreateStudentDto {
	@IsDefined()
	@IsString()
	@MinLength(8)
	readonly full_name: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => CreateGWDto)
	readonly gw?: CreateGWDto;

	@IsDefined()
	@IsMongoId()
	readonly group: ObjectIdType;
}

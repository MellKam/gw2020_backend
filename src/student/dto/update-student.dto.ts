import { Type } from 'class-transformer';
import {
	IsMongoId,
	IsOptional,
	IsString,
	MinLength,
	ValidateNested,
} from 'class-validator';
import { ObjectIdType } from '../../database/mongoose.utils';
import { UpdateGWDto } from './update-gw.dto';

export class UpdateStudentDto {
	@IsOptional()
	@IsString()
	@MinLength(8)
	readonly full_name?: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => UpdateGWDto)
	readonly gw?: UpdateGWDto;

	@IsOptional()
	@IsMongoId()
	readonly group?: ObjectIdType;
}

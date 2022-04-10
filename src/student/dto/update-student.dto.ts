import { Type } from 'class-transformer';
import {
	IsOptional,
	IsString,
	MinLength,
	ValidateNested,
} from 'class-validator';
import { GwDto } from './gw.dto';

export class UpdateStudentDto {
	@IsOptional()
	@IsString()
	@MinLength(8)
	readonly full_name: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => GwDto)
	readonly gw: GwDto;
}

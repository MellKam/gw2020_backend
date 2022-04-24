import { Type } from 'class-transformer';
import { IsArray, IsDate, IsString } from 'class-validator';

export class PutGwInfoDto {
	@IsDate()
	@Type(() => Date)
	delivery_date: string;

	@IsDate()
	@Type(() => Date)
	protection_date: string;

	@IsString()
	manager: string;

	@IsArray()
	@IsString({ each: true })
	reviewers: string[];
}

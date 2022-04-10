import {
	IsOptional,
	IsString,
	MinLength,
	IsIn,
	IsNumber,
	Min,
	Max,
} from 'class-validator';
import { GWStatusArray, GWStatus } from '../student.schema';

export class GwDto {
	@IsOptional()
	@IsString()
	@MinLength(8)
	readonly topic: string;

	@IsOptional()
	@IsString()
	@IsIn(GWStatusArray)
	readonly status: GWStatus;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(12)
	readonly grade: number;
}

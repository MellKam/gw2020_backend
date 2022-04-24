import {
	IsIn,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
	MinLength,
} from 'class-validator';
import { GWStatus, GWStatusArray } from '../schemas/gw-status.enum';

export class UpdateGwDto {
	@IsOptional()
	@IsString()
	@MinLength(8)
	readonly topic?: string;

	@IsOptional()
	@IsString()
	@IsIn(GWStatusArray)
	readonly status?: GWStatus;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(12)
	readonly grade?: number;
}

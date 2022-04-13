import {
	IsIn,
	IsMongoId,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
	MinLength,
} from 'class-validator';
import { GWStatus, GWStatusArray } from '../schemas/gw-status.enum';
import { ObjectIdType } from '../../database/mongoose.utils';

export class UpdateGWDto {
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

	@IsOptional()
	@IsMongoId()
	readonly gw_info?: ObjectIdType;
}

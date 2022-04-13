import {
	IsDefined,
	IsIn,
	IsMongoId,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
	MinLength,
} from 'class-validator';
import { ObjectIdType } from '../../database/mongoose.utils';
import { GWStatus, GWStatusArray } from '../schemas/gw-status.enum';

export class CreateGWDto {
	@IsDefined()
	@IsString()
	@MinLength(8)
	readonly topic: string;

	@IsOptional()
	@IsString()
	@IsIn(GWStatusArray)
	readonly status?: GWStatus;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(12)
	readonly grade?: number;

	@IsDefined()
	@IsMongoId()
	readonly gw_info: ObjectIdType;
}

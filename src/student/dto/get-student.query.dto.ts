import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetStudentQueryDto {
	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => value === 'true')
	populateGroup: boolean;
}

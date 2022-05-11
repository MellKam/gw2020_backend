import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetGroupQueryDto {
	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => value === 'true')
	populateStudents: boolean;
}

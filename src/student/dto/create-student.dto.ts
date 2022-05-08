import { IsDefined, IsMongoId, IsString, MinLength } from 'class-validator';

export class CreateStudentDto {
	@IsDefined()
	@IsString()
	@MinLength(8)
	readonly full_name: string;

	@IsDefined()
	@IsMongoId()
	readonly group: string;
}

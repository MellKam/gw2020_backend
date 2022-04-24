import { IsString, MinLength } from 'class-validator';

export class UpdateStudentDto {
	@IsString()
	@MinLength(8)
	readonly full_name: string;
}

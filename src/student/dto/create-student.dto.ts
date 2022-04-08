import { IsString, MinLength } from 'class-validator';

export class CreateStudentDto {
	@IsString()
	@MinLength(8)
	readonly full_name: string;
}

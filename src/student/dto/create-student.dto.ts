import { IsString, MinLength, Validate } from 'class-validator';
import { StudentExistRule } from '../validations/student-exist.rule';

export class CreateStudentDto {
	@IsString()
	@MinLength(8)
	@Validate(StudentExistRule)
	readonly full_name: string;
}

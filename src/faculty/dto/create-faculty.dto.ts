import { IsString, MinLength } from 'class-validator';

export class CreateFacultyDto {
	@MinLength(6)
	@IsString()
	name: string;
}

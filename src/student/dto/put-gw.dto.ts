import { IsDefined, IsString, MinLength } from 'class-validator';

export class PutGwDto {
	@IsDefined()
	@IsString()
	@MinLength(8)
	readonly topic: string;
}

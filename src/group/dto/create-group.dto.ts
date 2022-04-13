import { IsString, MinLength } from 'class-validator';

export class CreateGroupDto {
	@IsString()
	@MinLength(8)
	readonly master: string;
}

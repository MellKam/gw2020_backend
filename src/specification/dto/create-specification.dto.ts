import { IsMongoId, IsString, MinLength } from 'class-validator';

export class CreateSpecificationDto {
	@IsString()
	@MinLength(6)
	name: string;

	@IsMongoId()
	faculty: string;
}

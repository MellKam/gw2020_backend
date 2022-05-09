import { IsMongoId, IsOptional } from 'class-validator';

export class GetGroupsQueryDto {
	@IsOptional()
	@IsMongoId()
	specificationId?: string;
}

import { Specification } from '../specification.schema';

export interface GetSpecificationResponseDto {
	specification: Specification;
	facultyDirectionName: string;
}

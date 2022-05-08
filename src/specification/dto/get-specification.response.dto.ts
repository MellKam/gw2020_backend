import { ObjectIdType } from '../../database/mongoose.utils';
import { Specification } from '../specification.schema';

export interface GetSpecificationResponseDto {
	specification: Specification;
	facultyId: ObjectIdType;
}

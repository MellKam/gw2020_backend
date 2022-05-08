import { MongoDocument } from '../database/mongoose.utils';
import { Schema } from 'mongoose';
import {
	Specification,
	SpecificationSchema,
} from '../specification/specification.schema';

export interface Faculty {
	direction_name: string;
	specifications: Specification[];
}

const FacultySchema = new Schema<Faculty>({
	direction_name: { type: String, unique: true, required: true },
	specifications: {
		type: [{ type: SpecificationSchema }],
	},
});

// FacultySchema.index(
// 	{ 'specifcations.name': 1 },
// 	{
// 		unique: true,
// 		partialFilterExpression: {
// 			'specification.0': { $exists: true },
// 		},
// 	},
// );

export type FacultyDocument = MongoDocument<Faculty>;
export const FacultyImport = { name: 'Faculty', schema: FacultySchema };

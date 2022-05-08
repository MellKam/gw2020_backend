import { Schema } from 'mongoose';
import { MongoDocument } from '../database/mongoose.utils';

export interface Specification {
	name: string;
}

export const SpecificationSchema = new Schema<Specification>({
	name: { type: String, required: true },
});

export type SpecificationDocument = MongoDocument<Specification>;
export const SpecificationImport = {
	name: 'Specification',
	schema: SpecificationSchema,
};

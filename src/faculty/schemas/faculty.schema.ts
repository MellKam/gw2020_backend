import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoDocument, ObjectIdType } from '../../database/mongoose.utils';
import { Specification, SpecificationSchema } from './specification.schema';

@Schema()
export class Faculty {
	_id: ObjectIdType;

	@Prop({ type: String, required: true, unique: true })
	name: string;

	@Prop({ type: [{ type: SpecificationSchema, ref: 'Specification' }] })
	specifications: Specification[];
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
export type FacultyDocument = MongoDocument<Faculty>;
export const FacultyImport = { name: 'Faculty', schema: FacultySchema };

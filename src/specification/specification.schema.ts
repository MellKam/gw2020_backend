import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoDocument } from '../database/mongoose.utils';

@Schema()
export class Specification {
	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: Number, default: 0 })
	groupsNumber: number;
}

export const SpecificationSchema = SchemaFactory.createForClass(Specification);
export type SpecificationDocument = MongoDocument<Specification>;
export const SpecificationImport = {
	name: 'Specification',
	schema: SpecificationSchema,
};

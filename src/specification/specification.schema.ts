import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Schema()
export class Specification {
	_id: ObjectId;

	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: Number, default: 0 })
	groupsNumber: number;
}

export const SpecificationSchema = SchemaFactory.createForClass(Specification);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongooseObjectId } from '../utils/mongoose';
import { Specification } from './specification.schema';

export enum GWStatus {
	NOT_COMPLETED,
	COMPLETED,
	DEFENDED,
}

@Schema()
export class GW {
	@Prop({ type: MongooseObjectId, ref: Specification.name })
	specification: Specification;

	@Prop({ required: true })
	topic: string;

	@Prop(Number)
	status: GWStatus;

	@Prop({ type: Number, min: 1, max: 12 })
	grade: number;
}

export const GWSchema = SchemaFactory.createForClass(GW);

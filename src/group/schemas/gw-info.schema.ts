import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectIdType } from '../../database/mongoose.utils';

@Schema()
export class GWInfo {
	_id?: ObjectIdType;

	@Prop({ type: Date, required: true })
	delivery_date: string;

	@Prop({ type: Date, required: true })
	protection_date: string;

	@Prop({ type: String, required: true })
	manager: string;

	@Prop({ type: [String], required: true })
	reviewers: string[];
}

export const GWInfoSchema = SchemaFactory.createForClass(GWInfo);

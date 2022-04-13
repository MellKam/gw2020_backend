import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';

@NestSchema()
export class GWInfo {
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

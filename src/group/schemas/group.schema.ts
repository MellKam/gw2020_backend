import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GWInfoSchema } from './gw-info.schema';
// import { Specification } from '../specification/specification.schema';

export interface GWInfo {
	delivery_date: string;
	protection_date: string;
	manager: string;
	reviewers: string[];
}

@NestSchema()
export class Group {
	// @Prop({ type: MongooseObjectId, ref: Specification.name })
	// specification: Specification;

	@Prop({ type: String, required: true })
	master: string;

	@Prop({ type: GWInfoSchema, default: null })
	gw_info: GWInfo;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
export type GroupDocument = Group & Document;
export const GroupImport = { name: Group.name, schema: GroupSchema };

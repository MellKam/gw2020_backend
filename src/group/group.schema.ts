import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongooseObjectId } from '../database/mongoose.utils';
import { Specification } from '../specification/specification.schema';

export interface GWInfo {
	delivery_date: string;
	protection_date: string;
	manager: string;
	reviewers: string[];
}

@Schema()
export class Group {
	@Prop({ type: MongooseObjectId, ref: Specification.name })
	specification: Specification;

	@Prop({ required: true })
	master: string;

	@Prop({
		type: raw({
			delivery_date: { type: Date },
			protection_date: { type: Date },
			manager: { type: String },
			reviewers: { type: [String] },
		}),
		required: true,
	})
	gwInfo: GWInfo;
}

export const GroupSchema = SchemaFactory.createForClass(Group);

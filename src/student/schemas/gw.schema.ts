import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
	ObjectIdType,
	SchemaObjectId,
} from '../../database/mongoose.utils';
import { GWInfo } from '../../group/schemas/gw-info.schema';
import { GWStatus, GWStatusArray } from './gw-status.enum';

@Schema({ _id: false })
export class GW {
	@Prop({ type: String, required: true })
	topic: string;

	@Prop({
		type: String,
		enum: GWStatusArray,
		default: GWStatus.STARTED,
	})
	status: GWStatus;

	@Prop({ type: Number, min: 1, max: 12 })
	grade?: number;

	@Prop({ type: SchemaObjectId, required: true, ref: GWInfo.name })
	gw_info: GWInfo | ObjectIdType;
}

export const GWSchema = SchemaFactory.createForClass(GW);

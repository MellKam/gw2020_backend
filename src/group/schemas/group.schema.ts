import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
	MongoDocument,
	SchemaObjectId,
} from '../../database/mongoose.utils';
import { Student } from '../../student/schemas/student.schema';
import { GWInfo, GWInfoSchema } from './gw-info.schema';
// import { Specification } from '../specification/specification.schema';

@Schema()
export class Group {
	// @Prop({ type: MongooseObjectId, ref: Specification.name })
	// specification: Specification;

	@Prop({ type: String, required: true })
	master: string;

	@Prop({ type: GWInfoSchema })
	gw_info: GWInfo;

	@Prop({ type: [{ type: SchemaObjectId, ref: 'Student' }], default: [] })
	students: Student[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
export type GroupDocument = MongoDocument<Group>;
export const GroupImport = { name: Group.name, schema: GroupSchema };

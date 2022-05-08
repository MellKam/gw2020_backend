import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
	MongoDocument,
	ObjectIdType,
	SchemaObjectId,
} from '../../database/mongoose.utils';
import { Specification } from '../../specification/specification.schema';
import { Student } from '../../student/schemas/student.schema';
import { GWInfo, GWInfoSchema } from './gw-info.schema';

@Schema()
export class Group {
	_id: ObjectIdType;

	@Prop({ type: SchemaObjectId, ref: 'Specification', required: true })
	specification: Specification;

	@Prop({ type: Number, required: true, unique: true })
	number: number;

	@Prop({ type: String, required: true })
	master: string;

	@Prop({ type: GWInfoSchema })
	gw_info: GWInfo;

	@Prop({ type: [{ type: SchemaObjectId, ref: 'Student' }], default: [] })
	students: Student[] | ObjectIdType[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
export type GroupDocument = MongoDocument<Group>;
export const GroupImport = { name: Group.name, schema: GroupSchema };

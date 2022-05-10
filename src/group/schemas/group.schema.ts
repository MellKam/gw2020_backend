import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoDocument, SchemaObjectId } from '../../database/mongoose.utils';
import { ObjectId } from 'mongodb';
import { GWInfo, GWInfoSchema } from './gw-info.schema';
import { Specification } from '../../specification/specification.schema';
import { Student } from '../../student/schemas/student.schema';

export interface IGroup {
	_id?: ObjectId;
	specification: ObjectId | Specification;
	number: number;
	master: string;
	gw_info: GWInfo;
	students: ObjectId[] | Student[];
}

@Schema()
export class Group implements IGroup {
	_id?: ObjectId;

	@Prop({ type: SchemaObjectId, ref: 'Specification', required: true })
	specification: ObjectId;

	@Prop({ type: Number, required: true, unique: true, min: 1 })
	number: number;

	@Prop({ type: String, required: true })
	master: string;

	@Prop({ type: GWInfoSchema })
	gw_info: GWInfo;

	@Prop({ type: [{ type: SchemaObjectId, ref: 'Student' }], default: [] })
	students: ObjectId[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
export type GroupDocument = MongoDocument<Group>;
export const GroupImport = { name: Group.name, schema: GroupSchema };

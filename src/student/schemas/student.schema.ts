import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
	MongoDocument,
	ObjectIdType,
	SchemaObjectId,
} from '../../database/mongoose.utils';
import { Group } from '../../group/schemas/group.schema';
import { GW, GWSchema } from './gw.schema';

@Schema()
export class Student {
	_id?: ObjectIdType;

	@Prop({ type: String, required: true, unique: true })
	full_name: string;

	@Prop({ type: SchemaObjectId, ref: 'Group' })
	group: Group | ObjectIdType;

	@Prop({ type: GWSchema })
	gw: GW;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
export type StudentDocument = MongoDocument<Student>;
export const StudentImport = { name: Student.name, schema: StudentSchema };

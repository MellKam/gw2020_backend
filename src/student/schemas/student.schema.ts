import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoDocument, SchemaObjectId } from '../../database/mongoose.utils';
import { ObjectId } from 'mongodb';
import { GW, GWSchema } from './gw.schema';
import { Group } from '../../group/schemas/group.schema';

export interface IStudent {
	full_name: string;
	group: Group | ObjectId;
	gw: GW;
}

@Schema()
export class Student implements IStudent {
	@Prop({ type: String, required: true, unique: true })
	full_name: string;

	@Prop({ type: SchemaObjectId, ref: 'Group' })
	group: ObjectId;

	@Prop({ type: GWSchema })
	gw: GW;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
export type IStudentDocument = MongoDocument<IStudent>;
export type StudentDocument = MongoDocument<Student>;
export const StudentImport = { name: Student.name, schema: StudentSchema };

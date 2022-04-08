import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Group } from './group.schema';
import { MongooseObjectId } from '../utils/mongoose';
import { GW } from './gw.schema';

@Schema()
export class Student {
	@Prop({ required: true, unique: true })
	full_name: string;

	@Prop({ type: MongooseObjectId, ref: Group.name })
	group: Group;

	@Prop({ type: MongooseObjectId, ref: GW.name })
	gw: GW;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

export const StudentModel = { name: Student.name, schema: StudentSchema };

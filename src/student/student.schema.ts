import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongooseObjectId } from '../utils/mongoose';
import { Group } from '../group/group.schema';
import { GW } from '../schemas/gw.schema';

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

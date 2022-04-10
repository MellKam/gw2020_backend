import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
// import { MongooseObjectId } from '../utils/mongoose';
// import { Group } from '../group/group.schema';

export enum GWStatus {
	EMPTY = 'EMPTY',
	STARTED = 'STARTED',
	COMPLETED = 'COMPLETED',
	DEFENDED = 'DEFENDED',
}

export const GWStatusArray = Object.values(GWStatus);

export interface GW {
	topic: string;
	status: GWStatus;
	grade: number;
}

@Schema()
export class Student {
	@Prop({ required: true, unique: true })
	full_name: string;

	// @Prop({ type: MongooseObjectId, ref: Group.name })
	// group: Group;

	@Prop({
		type: raw({
			topic: { type: String, minlength: 8 },
			status: {
				type: String,
				enum: GWStatusArray,
				default: GWStatus.EMPTY,
			},
			grade: { type: Number, min: 1, max: 12 },
		}),
		_id: false,
		default: {},
	})
	gw: GW;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

export const StudentModel = { name: Student.name, schema: StudentSchema };

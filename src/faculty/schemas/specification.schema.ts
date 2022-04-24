import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectIdType, SchemaObjectId } from '../../database/mongoose.utils';
import { Faculty } from './faculty.schema';

@Schema()
export class Specification {
	_id?: ObjectIdType;

	@Prop({ type: String, required: true, unique: true })
	name: string;

	@Prop({ type: SchemaObjectId, ref: 'Faculty', required: true })
	faculty: Faculty | ObjectIdType;
}

export const SpecificationSchema = SchemaFactory.createForClass(Specification);

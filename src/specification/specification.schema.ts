import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Specification {
	@Prop({ required: true, unique: true })
	name: string;
}

export const SpecificationSchema = SchemaFactory.createForClass(Specification);

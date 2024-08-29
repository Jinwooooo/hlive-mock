import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypeOptions } from 'mongoose';

export type DealershipDocument = Dealership & Document;

@Schema()
export class Position {
	@Prop({ type: [Number], required: true, default: Array(2).fill(0) })
	coordinates: number[];

	@Prop({ required: true })
	type: string;
}

export const PositionSchema = SchemaFactory.createForClass(Position);

@Schema()
export class Dealership extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dealershipCode: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  telephone: string;

  @Prop({ required: false })
  website: string;

  @Prop({ type: PositionSchema })
  position: Position;
}

export const DealershipSchema = SchemaFactory.createForClass(Dealership);

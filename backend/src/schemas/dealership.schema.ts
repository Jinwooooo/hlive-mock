import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypeOptions } from 'mongoose';

export type DealershipDocument = Dealership & Document;

@Schema()
export class BusinessHours {
  @Prop({ required: true })
  open: string;

  @Prop({ required: true })
  close: string;
}

export const BusinessHoursSchema = SchemaFactory.createForClass(BusinessHours);

@Schema()
export class Position {
	@Prop({ type: [String], required: true, default: Array(2).fill('') })
	coordinates: string[];

	@Prop({ required: true })
	type: string;
}

export const PositionSchema = SchemaFactory.createForClass(Position);

@Schema()
export class Dealership extends Document {
  @Prop({ type: BusinessHoursSchema })
  businessHours: BusinessHours;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  countryCode: string;

  @Prop({ required: true })
  dealershipCode: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: PositionSchema })
  position: Position;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  regionName: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  telephone: string;

  @Prop({ required: true })
  webUrl: string;
}

export const DealershipSchema = SchemaFactory.createForClass(Dealership);

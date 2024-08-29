import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {
  @Prop({ required: true })
  bookingDate: string;

  @Prop({ required: true })
  bookingTime: string;

  @Prop({ required: true })
  dealershipCode: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

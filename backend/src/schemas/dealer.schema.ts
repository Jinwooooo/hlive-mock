import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DealerDocument = Dealer & Document;

@Schema()
export class Dealer {
  @Prop({ required: true })
  shopname: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  telephone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  weburl: string;

  @Prop({ required: true })
  longitude: string;

  @Prop({ required: true })
  latitude: string;

  @Prop({ type: [Number], required: true })
  employee_arr_id: number[];
}

export const DealerSchema = SchemaFactory.createForClass(Dealer);

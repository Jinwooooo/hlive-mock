import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReserveDocument = Reserve & Document;

@Schema()
export class ReserveInfo {
  @Prop({ required: true })
  time: string;

  @Prop({ required: true, default: 0 })
  currReserve: number;
}

export const ReserveInfoSchema = SchemaFactory.createForClass(ReserveInfo);

@Schema()
export class Reserve {
  @Prop({ required: true })
  dealershipCode: string;

  @Prop({ required: true })
  bookingDate: string;

  @Prop({ required: true, default: 0 })
  maxReserve: number;

  @Prop({ type: [ReserveInfoSchema], required: true })
  reserveInfo: ReserveInfo[];
}

export const ReserveSchema = SchemaFactory.createForClass(Reserve);

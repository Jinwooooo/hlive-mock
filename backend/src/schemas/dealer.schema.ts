import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DealerDocument = Dealer & Document;

@Schema()
export class Dealer {
  @Prop({ required: true })
  dealershipCode: string;
}

export const DealerSchema = SchemaFactory.createForClass(Dealer);

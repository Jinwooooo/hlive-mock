import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModelDocument = Model & Document;

@Schema()
export class Model {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  imageUrl: string;
}

export const ModelSchema = SchemaFactory.createForClass(Model);

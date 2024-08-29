import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModelDocument = Model & Document;

@Schema()
export class Model {
  @Prop({ required: true })
  modelId: string;

  @Prop({ required: true })
  modelDescription: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  carType1Desc: string;
}

export const ModelSchema = SchemaFactory.createForClass(Model);

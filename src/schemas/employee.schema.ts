import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true })
  id: number;

  @Prop({ type: [String], required: true, default: Array(10).fill('') })
  car_slot: string[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

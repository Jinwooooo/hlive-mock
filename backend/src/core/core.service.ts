import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Model as CarModel, ModelDocument as CarModelDocument} from '../schemas/model.schema';
import { Dealer, DealerDocument } from '../schemas/dealer.schema';
import { Dealership, DealershipDocument} from '../schemas/dealership.schema';

@Injectable()
export class CoreService {
  constructor(
    @InjectModel(Dealer.name) private dealerModel: Model<DealerDocument>,
    @InjectModel(CarModel.name) private carModel: Model<CarModelDocument>,
    @InjectModel(Dealership.name) private dealershipModel: Model<DealershipDocument>,
  ) {}

  async getAllCarModels(): Promise<CarModel[]> {
    return this.carModel.find().exec();
  }

  async getAllDealers(): Promise<Dealer[]> {
    return this.dealerModel.find().exec();
  }

  async getAllDealerships(): Promise<Dealer[]> {
    return this.dealershipModel.find().exec();
  }
}

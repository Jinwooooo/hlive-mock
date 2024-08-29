import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dealer, DealerDocument } from './schemas/dealer.schema';
import { Model as CarModel, ModelDocument as CarModelDocument} from './schemas/model.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Dealer.name) private dealerModel: Model<DealerDocument>,
    @InjectModel(CarModel.name) private carModel: Model<CarModelDocument>,
  ) {}

  async getAllCarModels(): Promise<CarModel[]> {
    return this.carModel.find().exec();
  }

  async getAllDealers(): Promise<Dealer[]> {
    return this.dealerModel.find().exec();
  }


}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { Dealer, DealerDocument } from './schemas/dealer.schema';
import { Dealership, DealershipDocument } from './schemas/dealership.schema';
import { Model as CarModel, ModelDocument } from './schemas/model.schema';
import { Service, ServiceDocument } from './schemas/service.schema';

@Injectable()
export class InitDbService {
  constructor(
    @InjectModel(Dealer.name) private dealerModel: Model<DealerDocument>,
    @InjectModel(Dealership.name) private dealershipModel: Model<DealershipDocument>,
    @InjectModel(CarModel.name) private modelModel: Model<ModelDocument>,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  async initDb() {
    const dataDir = path.join(__dirname, '..', 'data');

    const dealersJson = fs.readFileSync(path.join(dataDir, 'dealer.json'), 'utf-8');
    const dealers = JSON.parse(dealersJson);
    await this.dealerModel.insertMany(dealers);

    const dealershipsJson = fs.readFileSync(path.join(dataDir, 'dealership.json'), 'utf-8');
    const dealerships = JSON.parse(dealershipsJson);
    await this.dealershipModel.insertMany(dealerships);

    const modelsJson = fs.readFileSync(path.join(dataDir, 'model.json'), 'utf-8');
    const models = JSON.parse(modelsJson);
    await this.modelModel.insertMany(models);

    const servicesJson = fs.readFileSync(path.join(dataDir, 'service.json'), 'utf-8');
    const services = JSON.parse(servicesJson).map((service: any) => {
      return {
        bookingDate: service.bookingDate,
        bookingTime: service.bookingTime,
        dealershipCode: service.dealership.dealershipCode,
      };
    });
    await this.serviceModel.insertMany(services);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as fs from 'fs';
import * as path from 'path';

import { Dealer, DealerDocument } from '../schemas/dealer.schema';
import { Dealership, DealershipDocument } from '../schemas/dealership.schema';
import { Model as CarModel, ModelDocument } from '../schemas/model.schema';
import { Service, ServiceDocument } from '../schemas/service.schema';
import { Reserve, ReserveDocument, ReserveInfo } from '../schemas/reserve.schema';

@Injectable()
export class InitializeService {
  private readonly logger = new Logger(InitializeService.name);

  constructor(
    @InjectModel(Dealer.name) private dealerModel: Model<DealerDocument>,
    @InjectModel(Dealership.name) private dealershipModel: Model<DealershipDocument>,
    @InjectModel(CarModel.name) private modelModel: Model<ModelDocument>,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
    @InjectModel(Reserve.name) private reserveModel: Model<ReserveDocument>,
  ) {}

  async initDb() {
    const dataDir = path.join(__dirname, '..', '..', 'data');

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
    const services = JSON.parse(servicesJson).map((service: any) => ({
      bookingDate: service.bookingDate,
      bookingTime: service.bookingTime,
      dealershipCode: service.dealershipCode || service.dealership?.dealershipCode,
    }));
    await this.serviceModel.insertMany(services);

    for (const dealer of dealers) {
      const dealershipCode = dealer.dealershipCode;

      const serviceDates = await this.serviceModel.distinct('bookingDate', {
        dealershipCode,
      });

      for (const bookingDate of serviceDates) {
        const reserveInfo: ReserveInfo[] = [
          { time: '09:00', currReserve: 0 },
          { time: '10:00', currReserve: 0 },
          { time: '11:00', currReserve: 0 },
          { time: '12:00', currReserve: 0 },
          { time: '13:00', currReserve: 0 },
          { time: '14:00', currReserve: 0 },
          { time: '15:00', currReserve: 0 },
          { time: '16:00', currReserve: 0 },
          { time: '17:00', currReserve: 0 },
          { time: '18:00', currReserve: 0 },
          { time: '19:00', currReserve: 0 },
        ];

        const maxReserve = await this.dealerModel.countDocuments({ dealershipCode });

        const servicesForDate = await this.serviceModel.find({
          dealershipCode,
          bookingDate,
        });

        for (const service of servicesForDate) {
          const reserveSlot = reserveInfo.find((slot) => slot.time === service.bookingTime);
          if (reserveSlot) {
            reserveSlot.currReserve++;
          }
        }

        const reserveData = {
          dealershipCode,
          bookingDate,
          maxReserve,
          reserveInfo,
        };

        await this.reserveModel.create(reserveData);
      }
    }
  }
}

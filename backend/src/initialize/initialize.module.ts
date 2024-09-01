import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InitializeService } from './initialize.service';
import { InitializeController } from './initialize.controller';
import { Dealer, DealerSchema } from '../schemas/dealer.schema';
import { Dealership, DealershipSchema } from '../schemas/dealership.schema';
import { Model as CarModel, ModelSchema as CarModelSchema } from '../schemas/model.schema';
import { Service, ServiceSchema } from '../schemas/service.schema';
import { Reserve, ReserveSchema } from '../schemas/reserve.schema';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Dealer.name, schema: DealerSchema },
        { name: Dealership.name, schema: DealershipSchema },
        { name: CarModel.name, schema: CarModelSchema },
        { name: Service.name, schema: ServiceSchema },
        { name: Reserve.name, schema: ReserveSchema },
      ]),
    ],
    controllers: [InitializeController],
    providers: [InitializeService],
  })
  export class InitializeModule {}
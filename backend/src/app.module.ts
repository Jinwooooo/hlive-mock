import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Dealer, DealerSchema } from './schemas/dealer.schema';
import { Dealership, DealershipSchema } from './schemas/dealership.schema';
import { Model as CarModel, ModelSchema } from './schemas/model.schema';
import { Service, ServiceSchema } from './schemas/service.schema';
import { InitDbService } from './init-db.service';
import { InitDbController } from './init-db.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([
      { name: Dealer.name, schema: DealerSchema },
      { name: Dealership.name, schema: DealershipSchema },
      { name: CarModel.name, schema: ModelSchema },
      { name: Service.name, schema: ServiceSchema },
    ]),
  ],
  controllers: [AppController, InitDbController],
  providers: [AppService, InitDbService],
})
export class AppModule {}

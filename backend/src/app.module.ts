import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import { InitializeModule } from './initialize/initialize.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    CoreModule,
    InitializeModule,
  ],
})
export class AppModule {}

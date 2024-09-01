import { Controller, Get } from '@nestjs/common';
import { CoreService } from './core.service';

@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get('models')
  async getAllCarModels() {
    return this.coreService.getAllCarModels();
  }

  @Get('dealers')
  async getAllDealers() {
    return this.coreService.getAllDealers();
  }

  @Get('dealerships')
  async getAllDealerships() {
    return this.coreService.getAllDealerships();
  }
}

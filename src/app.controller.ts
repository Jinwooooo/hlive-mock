import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get_all_dealer')
  async getAllDealers() {
    const dealers = await this.appService.getAllDealers();
    return dealers;
  }
  
  // inserting single data manually
  @Post('dealer')
  createDealer(@Body() dealerDto: any) {
    return this.appService.createDealer(dealerDto);
  }
  @Post('employee')
  createEmployee(@Body() employeeDto: any) {
    return this.appService.createEmployee(employeeDto);
  }

  // inserting batch dummy data
  @Post('reset_db')
  async resetDatabase() {
    await this.appService.resetDatabase();
    return { message: 'Database has been reset and dummy data inserted' };
  }
}

import { Body, Controller, Get, Post, Query, NotFoundException, ConflictException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get_all_dealer')
  async getAllDealers() {
    const dealers = await this.appService.getAllDealers();
    return dealers;
  }

  @Get('check_availability')
  async checkAvailability(@Query('shopname') shopname: string) {
    try {
      const availability = await this.appService.checkAvailability(shopname);
      return { shopname, availability };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
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

  @Post('reserve')
  async reserveSlot(@Query('shopname') shopname: string, @Query('time_idx') time_idx: number) {
    try {
      const result = await this.appService.reserveSlot(shopname, time_idx);
      return { message: result };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('An error occurred while reserving the slot.');
    }
  }

  // inserting batch dummy data
  @Post('reset_db')
  async resetDatabase() {
    await this.appService.resetDatabase();
    return { message: 'Database has been reset and dummy data inserted' };
  }
}

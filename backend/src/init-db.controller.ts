import { Controller, Post, HttpStatus, HttpException } from '@nestjs/common';
import { InitDbService } from './init-db.service';

@Controller()
export class InitDbController {
  constructor(private readonly initDbService: InitDbService) {}

  @Post('init_db')
  async initDb() {
    try {
      await this.initDbService.initDb();
      return {
        status: HttpStatus.OK,
        message: 'Database initialization complete',
      };
    } catch (error) {
      throw new HttpException(
        'Database initialization failed: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

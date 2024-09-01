import { Controller, Post, HttpStatus, HttpException } from '@nestjs/common';
import { InitializeService} from './initialize.service';

@Controller('initialize')
export class InitializeController {
  constructor(private readonly initializeService: InitializeService) {}

  @Post('db')
  async initDb() {
    try {
      await this.initializeService.initDb();
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

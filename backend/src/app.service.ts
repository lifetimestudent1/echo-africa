import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { status: string; name: string; version: string } {
    return {
      status: 'ok',
      name: 'Echo Africa API',
      version: '1.0.0',
    };
  }
}

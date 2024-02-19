import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DaysController } from './days/days.controller';
import { DaysService } from './days/days.service';

@Module({
  imports: [],
  controllers: [AppController, DaysController],
  providers: [AppService, DaysService],
})
export class AppModule {}

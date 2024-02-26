import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RepositoryModule } from "../repository/repository.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DaysController } from "./days/days.controller";
import { DaysService } from "./days/days.service";

@Module({
  imports: [
    RepositoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, DaysController],
  providers: [AppService, DaysService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserRepository } from "./repositories/user.repository";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("POSTGRE_DATABASE_HOST"),
        port: configService.get<number>("POSTGRE_DATABASE_PORT"),
        username: configService.get<string>("POSTGRE_DATABASE_USER_NAME"),
        password: configService.get<string>("POSTGRE_DATABASE_PASSWORD"),
        database: configService.get<string>("POSTGRE_DATABASE_NAME"),
        entities: [User],
        synchronize: false,
        migrations: [`${__dirname}/migrations/*.js`],
        migrationsRun: true,
      }),
    }),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  providers: [UserRepository],
  exports: [TypeOrmModule],
})
export class TypeormModule {}

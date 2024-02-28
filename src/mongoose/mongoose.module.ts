import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule as Mongoose } from "@nestjs/mongoose";
import { MongooseUserRepository } from "./repositories/user.repository";
import { User, UserSchema } from "./schemas/user.schema";

@Module({
  imports: [
    Mongoose.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
      inject: [ConfigService],
    }),
    Mongoose.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [MongooseUserRepository],
  exports: [Mongoose],
})
export class MongooseModule {}

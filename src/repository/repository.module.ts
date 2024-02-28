import { Module } from "@nestjs/common";
import { MongooseModule } from "../mongoose/mongoose.module";
import { MongooseUserRepository } from "../mongoose/repositories/user.repository";
import { UserRepository as TypeormUser } from "../typeorm/repositories/user.repository";
import { TypeormModule } from "../typeorm/typeorm.module";

@Module({
  imports: [TypeormModule, MongooseModule],
  providers: [
    {
      provide: "userRepository",
      useClass:
        process.env.DB_TYPE === "postgre"
          ? TypeormUser
          : MongooseUserRepository,
    },
  ],
  exports: ["userRepository"],
})
export class RepositoryModule {}

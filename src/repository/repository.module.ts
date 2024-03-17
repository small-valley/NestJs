import { Module } from "@nestjs/common";
import { UserRepository as TypeormUser } from "../typeorm/repositories/user.repository";
import { TypeormModule } from "../typeorm/typeorm.module";

@Module({
  imports: [TypeormModule],
  providers: [
    {
      provide: "userRepository",
      useClass: TypeormUser,
      // process.env.DB_TYPE === "postgre"
      //   ? TypeormUser
      //   : MongooseUserRepository,
    },
  ],
  exports: ["userRepository"],
})
export class RepositoryModule {}

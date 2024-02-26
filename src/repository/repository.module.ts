import { Module } from "@nestjs/common";
import { UserRepository } from "../typeorm/repositories/user.repository";
import { TypeormModule } from "../typeorm/typeorm.module";

@Module({
  imports: [TypeormModule],
  providers: [
    {
      provide: "userRepository",
      useClass:
        process.env.NODE_ENV === "development"
          ? UserRepository
          : UserRepository,
    },
  ],
  exports: ["userRepository"],
})
export class RepositoryModule {}

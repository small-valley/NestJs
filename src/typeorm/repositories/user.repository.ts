import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IUserRepository } from "../../repository/interfaces/IUserRepository";
import { User as ReturnTypeUser } from "../../repository/models/user.model";
import { User } from "../entities/user.entity";

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<ReturnTypeUser[]> {
    this.userRepository.save({
      firstName: "Timber",
      lastName: "Saw",
    });
    return this.userRepository.find();
  }
}

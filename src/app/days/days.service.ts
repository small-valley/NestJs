import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../../typeorm/repositories/user.repository";

@Injectable()
export class DaysService {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  async getDaysWithSpots() {
    return await this.userRepository.findAll();
  }
}

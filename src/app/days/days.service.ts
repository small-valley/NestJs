import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../repository/interfaces/IUserRepository";

@Injectable()
export class DaysService {
  @Inject("userRepository")
  private readonly userRepository: IUserRepository;

  async getDaysWithSpots() {
    return await this.userRepository.findAll();
  }
}

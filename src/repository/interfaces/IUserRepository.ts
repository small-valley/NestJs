import { User } from "../models/user.model";

export interface IUserRepository {
  findAll(): Promise<User[]>;
}

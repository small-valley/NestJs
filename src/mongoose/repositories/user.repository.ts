import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUserRepository } from "../../repository/interfaces/IUserRepository";
import { User as ReturnTypeUser } from "../../repository/models/user.model";
import { User, UserDocument } from "../schemas/user.schema";

export class MongooseUserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<ReturnTypeUser[]> {
    const createdUser = new this.userModel({
      firstName: "Timber",
      lastName: "Saw",
    });
    createdUser.save();
    return this.userModel.find();
  }
}

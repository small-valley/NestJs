import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ name: "first_name" })
  firstName: string;

  @Prop({ name: "last_name" })
  lastName: string;

  @Prop({ name: "is_acrive", default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

import mongoose, { Schema } from "mongoose";
import { IUser } from "../Interfaces";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_no: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: {
      values: ["user", "admin", "seller"],
      message: "{VALUE} is not valid role",
    },
    required: true,
  },
});

export const users = mongoose.model<IUser>("users", UserSchema);

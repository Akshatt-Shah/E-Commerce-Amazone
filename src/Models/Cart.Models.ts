import mongoose, { Schema } from "mongoose";
import { ICart } from "../Interfaces";
import { users } from "./User.Models";

const CartSchema: Schema = new Schema({
  user_id: { type: Schema.ObjectId, ref: users, required: true },
});

export const carts = mongoose.model<ICart>("carts", CartSchema);

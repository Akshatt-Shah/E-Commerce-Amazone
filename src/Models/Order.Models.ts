import mongoose, { Schema } from "mongoose";
import { IOrder } from "../Interfaces";
import { users } from "./User.Models";

const OrdersSchema: Schema = new Schema({
  user_id: { type: Schema.ObjectId, ref: users, required: true },
  total: { type: Number, required: true },
});

export const orders = mongoose.model<IOrder>("orders", OrdersSchema);

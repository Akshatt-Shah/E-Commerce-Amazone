import mongoose, { Schema } from "mongoose";
import { IStore } from "../Interfaces";
import { users } from "./User.Models";

const StoreSchema: Schema = new Schema({
  seller_id: { type: Schema.ObjectId, ref: users, required: true },
  store_name: { type: String, required: true, unique: true },
  store_address: { type: String, required: true, unique: true },
});

export const stores = mongoose.model<IStore>("stores", StoreSchema);

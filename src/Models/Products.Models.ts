import mongoose, { Schema } from "mongoose";
import { IProduct } from "../Interfaces";
import { categories } from "./Category.Models";
import { stores } from "./Store.Models";

const ProductSchema: Schema = new Schema({
  store_id: { type: Schema.ObjectId, ref: stores, required: true },
  category_id: { type: Schema.ObjectId, ref: categories, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  description: { type: String },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true, min: 0 },
});

export const products = mongoose.model<IProduct>("products", ProductSchema);

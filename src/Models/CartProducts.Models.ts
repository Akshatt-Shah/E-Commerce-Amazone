import mongoose, { Schema } from "mongoose";
import { carts } from "./Cart.Models";
import { products } from "./Products.Models";
import { ICartProducts } from "../Interfaces";

const CartProductSchema: Schema = new Schema({
  cart_id: { type: Schema.ObjectId, ref: carts, required: true },
  product_id: { type: Schema.ObjectId, ref: products, required: true },
  product_qty: { type: Number, required: true },
});

export const cartproducts = mongoose.model<ICartProducts>(
  "cartproducts",
  CartProductSchema
);

import mongoose, { Schema } from "mongoose";
import { IOrder_Products } from "../Interfaces";
import { orders } from "./Order.Models";
import { products } from "./Products.Models";

const OrderProductsSchema: Schema = new Schema({
  order_id: { type: Schema.ObjectId, ref: orders, required: true },
  product_id: { type: Schema.ObjectId, ref: products, required: true },
  product_price: { type: Number, required: true },
  product_qty: { type: Number, required: true },
});

export const order_products = mongoose.model<IOrder_Products>(
  "order_products",
  OrderProductsSchema
);

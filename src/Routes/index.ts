import { Router } from "express";
import URoute from "./User.Routes";
import SRoute from "./Store.Routes";
import catRoute from "./Category.Routes";
import PRoute from "./Products.Routes";
import CRouter from "./Cart.Routes";
import ORoute from "./Order.Routes";
import express from "express";
export const Route = Router();

Route.use(URoute);
Route.use(SRoute);
Route.use(catRoute);
Route.use(PRoute);
Route.use(CRouter);
Route.use(ORoute);
Route.get("/", (req, res) => {
  res.send("hello world");
});

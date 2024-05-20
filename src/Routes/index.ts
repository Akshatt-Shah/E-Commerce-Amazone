import { Router } from "express";
import URoute from "./User.Routes";
import SRoute from "./Store.Routes";
import express from "express";
export const Route = Router();

Route.use(URoute);
Route.use(SRoute)
Route.get("/", (req, res) => {
  res.send("hello world");
});

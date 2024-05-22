import { Router } from "express";
import { OrderController } from "../Controllers";
import { VerifyToken } from "../Middlewares/VerifyToken.Middleware";
const Verify = new VerifyToken();
const OrderControllers = new OrderController();

const ORoute = Router();
ORoute.post(
  "/order/placeorder",
  Verify.verifyTokenForUser,
  OrderControllers.PlaceOrder
);
ORoute.post(
  "/order/cancelorder/:orderid",
  Verify.verifyTokenForUser,
  OrderControllers.CancelOrder
);
ORoute.get(
  "/order/getorder/?",
  Verify.verifyTokenForUser,
  OrderControllers.GetOrder
);

export default ORoute;

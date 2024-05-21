import { Router } from "express";
import { CartController } from "../Controllers";
import { VerifyToken } from "../Middlewares/VerifyToken.Middleware";
const Verify = new VerifyToken();
const CartControllers = new CartController();
const CRouter = Router();

CRouter.get(
  "/cart/getcart",
  Verify.verifyTokenForUser,
  CartControllers.GetCart
);
CRouter.post(
  "/cart/addcartproduct",
  Verify.verifyTokenForUser,
  CartControllers.AddCartProduct
);
CRouter.get(
  "/cart/getcartproduct",
  Verify.verifyTokenForUser,
  CartControllers.GetCartProduct
);
CRouter.put(
  "/cart/updatecartproduct",
  Verify.verifyTokenForUser,
  CartControllers.UpdateCartProduct
);
CRouter.delete(
  "/cart/deletecartproduct/:pid",
  Verify.verifyTokenForUser,
  CartControllers.DeleteCartProduct
);

export default CRouter;

import { Router } from "express";
import { StoreControllers } from "../Controllers/Store.Controller";
import { VerifyToken } from "../Middlewares/VerifyToken.Middleware";
const Verify = new VerifyToken();
const storecontroller = new StoreControllers();
const SRoute = Router();

SRoute.post(
  "/store/createstore",
  Verify.verifyTokenForSeller,
  storecontroller.CreateStore
);

SRoute.get(
  "/store/getsellerstore",
  Verify.verifyTokenForSeller,
  storecontroller.GetSellerStore
);
SRoute.get(
  "/store/getstore",
  Verify.verifyTokenForAdmin,
  storecontroller.GetAllStore
);

SRoute.put(
  "/store/updatestore/:store_id",
  Verify.verifyTokenForSeller,
  storecontroller.UpdateStore
);
SRoute.delete(
  "/store/deletesellerstore/:store_id",
  Verify.verifyTokenForSeller,
  storecontroller.DeleteSellerStore
);
SRoute.delete(
  "/store/deletestore/:store_id",
  Verify.verifyTokenForAdmin,
  storecontroller.DeleteStore
);

export default SRoute;

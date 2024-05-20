import { Router } from "express";
import { StoreControllers } from "../Controllers/Store.Controller";
import { VerifyToken } from "../Middlewares/VerifyToken.Middleware";
const Verify = new VerifyToken()
const storecontroller = new StoreControllers();
const SRoute= Router();

SRoute.post("/store/createstore",Verify.verifyTokenForSeller,storecontroller.CreateStore)

export default SRoute;
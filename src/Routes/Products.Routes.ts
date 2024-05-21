import { Router } from "express";
import { ProductController } from "../Controllers";
import { VerifyToken } from "../Middlewares/VerifyToken.Middleware";
const Verify = new VerifyToken();
const ProductControllers = new ProductController();

const PRoute = Router();
PRoute.post(
  "/product/createproduct",
  Verify.verifyTokenForSeller,
  ProductControllers.CreateProduct
);

PRoute.get(
  "/product/getproduct/:storeid",
  Verify.verifyTokenForSeller,
  ProductControllers.GetProduct
);

PRoute.get("/product/getallproduct", ProductControllers.GetAllProduct);

PRoute.put(
  "/product/updateproduct/:pid",
  Verify.verifyTokenForSeller,
  ProductControllers.UpdateProduct
);

PRoute.delete(
  "/product/deleteproduct/:pid",
  Verify.verifyTokenForSeller,
  ProductControllers.DeleteProduct
);

export default PRoute;

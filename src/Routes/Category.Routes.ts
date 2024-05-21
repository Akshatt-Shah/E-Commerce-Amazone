import { Router } from "express";
import { CategoryController } from "../Controllers";
import { VerifyToken } from "../Middlewares/VerifyToken.Middleware";
import { verify } from "jsonwebtoken";
const Verify = new VerifyToken();
const CategoryControllers = new CategoryController();

 const catRoute = Router();
catRoute.post(
  "/category/createcategory",
  Verify.verifyTokenForAdmin,
  CategoryControllers.CreateCategory
);
catRoute.get(
  "/category/getcategory",
  CategoryControllers.GetCategory
);
catRoute.put(
  "/category/updatecategory/:id",
  Verify.verifyTokenForAdmin,
  CategoryControllers.UpdateCategory
);
catRoute.delete(
  "/category/deletecategory/:id",
  Verify.verifyTokenForAdmin,
  CategoryControllers.DeleteCategory
);

export default catRoute
import { UserControllers } from "../Controllers/User.Controller";
const usercontroller = new UserControllers();
import { Router } from "express";
import { VerifyToken } from "../Middlewares/VerifyToken.Middleware";
import { verify } from "jsonwebtoken";
const Verify = new VerifyToken();
const URoute = Router();

URoute.post(
  "/user/createuser",
  Verify.verifyTokenForAdmin,
  usercontroller.CreateUser
);

URoute.get("/user/getalluser", usercontroller.GetAllUser);

URoute.get("/user/getuser/:id", usercontroller.GetUser);

URoute.put("/user/updateuser", Verify.verifyToken, usercontroller.UpdateUser);

URoute.delete(
  "/user/deleteuser/:userId",
  Verify.verifyTokenForAdmin,
  usercontroller.DeleteUser
);

URoute.delete(
  "/user/deleteuser",
  Verify.verifyToken,
  usercontroller.DeleteUser
);

URoute.post("/user/loginuser", usercontroller.LoginUser);

export default URoute;

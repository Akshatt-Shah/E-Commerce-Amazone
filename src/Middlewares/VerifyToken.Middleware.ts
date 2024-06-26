const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { users } from "../Models";
import { IUser } from "../Interfaces";
import { config } from "dotenv";
config();
const secretkey = process.env.SECRET_KEY || "AkshatShah";

export interface newrequest extends Request {
  userId?: string;
  sellerId?: string;
}
export class VerifyToken {
  async verifyTokenForAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const Usertoken = req.cookies.LoginToken;

      const usertoken = jwt.verify(Usertoken, secretkey);
      //   console.log(usertoken.UserToken);
      const data: any | null = await users.find({ _id: usertoken.UserToken });
      console.log(data);
      if (data[0].role === "admin") {
        next();
      } else {
        res.status(400).json({
          message: "Only Admin Can make the Changes......",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async verifyTokenForUser(req: newrequest, res: Response, next: NextFunction) {
    try {
      let userId;
      const Usertoken = req.cookies.LoginToken;

      const usertoken = jwt.verify(Usertoken, secretkey);
      //   console.log(usertoken.UserToken);
      const data: any | null = await users.find({ _id: usertoken.UserToken });
      console.log(data);
      if (data[0].role === "user") {
        req.userId = data[0].id;
        next();
      } else {
        res.status(400).json({
          message: "Only User Can Place the Order......",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async verifyTokenForSeller(
    req: newrequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      let userId;
      const Usertoken = req.cookies.LoginToken;

      const usertoken = jwt.verify(Usertoken, secretkey);
      //   console.log(usertoken.UserToken);
      const data: any | null = await users.find({ _id: usertoken.UserToken });
      console.log(data);
      if (data[0].role === "seller") {
        req.sellerId = data[0].id;
        next();
      } else {
        res.status(400).json({
          message: "Only Seller Can Add the Store......",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async verifyToken(req: newrequest, res: Response, next: NextFunction) {
    try {
      let userId;
      const Usertoken = req.cookies.LoginToken;

      const usertoken = jwt.verify(Usertoken, secretkey);
      //   console.log(usertoken.UserToken);
      const data: any | null = await users.find({ _id: usertoken.UserToken });
      console.log(data);

      req.userId = data[0].id;
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
}

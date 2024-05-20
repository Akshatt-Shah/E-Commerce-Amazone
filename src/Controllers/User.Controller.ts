import express, { Request, Response } from "express";
import { UserServices } from "../Services";
import { IUser } from "../Interfaces";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import Jwt from "jsonwebtoken";
import { newrequest } from "../Middlewares/VerifyToken.Middleware";
config();
const secretkey = process.env.SECRET_KEY || "AkshatShah";
const user = new UserServices();

export class UserControllers {
  async CreateUser(req: Request, res: Response) {
    try {
      console.log("first");
      let data: IUser = req.body;
      data.password = await bcrypt.hash(data.password, 10);
      const userdata = await user.CreateUser(data);
      res.status(200).json(userdata);
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
  async GetAllUser(req: Request, res: Response) {
    try {
      const userdata = await user.GetAllUser();
      res.status(200).json(userdata);
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
  async GetUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userdata = await user.GetUser(id);
      res.status(200).json(userdata);
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
  async UpdateUser(req: newrequest, res: Response) {
    try {
      const id: any = req.userId;
      let data = req.body;
      data.password = await bcrypt.hash(data.password, 10);
      const userdata = await user.UpdateUser(id, data);
      res
        .status(200)
        .json({ message: "User Updated Successfully", status: true });
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
  async DeleteUser(req: newrequest, res: Response) {
    try {
      const { userId } = req.params;
      if (userId) {
        const userdata = await user.DeleteUser(userId);
      } else {
        const userId: any = req.userId;
        const userdata = await user.DeleteUser(userId);
      }
      res
        .status(200)
        .json({ message: "User Deleted Successfully", status: true });
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
  async LoginUser(req: Request, res: Response) {
    try {
      const { name, password } = req.body;

      const userdata = await user.LoginUser(name, password);
      if (userdata.token) {
        res.cookie("LoginToken", userdata.token);
      }
      res.status(200).json({ message: userdata });
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
}

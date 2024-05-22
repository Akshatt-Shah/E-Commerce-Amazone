import { IOrder } from "../Interfaces";
import { IOrder_Products } from "../Interfaces";
import express, { Request, Response } from "express";
import { newrequest } from "../Middlewares/VerifyToken.Middleware";
import { OrderServices } from "../Services";
const OrderService = new OrderServices();

export class OrderController {
  async PlaceOrder(req: newrequest, res: Response) {
    try {
      const userId = req.userId;
      const data: IOrder_Products[] = req.body;
      const Order = await OrderService.PlaceOrder(data, userId);
      res.status(200).json(Order);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async CancelOrder(req: newrequest, res: Response) {
    try {
      const { orderid }: any = req.params;
      const Order = await OrderService.CancelOrder(orderid);
      res.status(200).json(Order);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async GetOrder(req: newrequest, res: Response) {
    try {
      const userid: any = req.userId;
      const { orderid }: any = req.query;
      if (orderid !== null) {
        const Order = await OrderService.GetOrder(userid, orderid);
        res.status(200).json(Order);
      } else {
        const Order = await OrderService.GetOrder(userid);
        res.status(200).json(Order);
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
}

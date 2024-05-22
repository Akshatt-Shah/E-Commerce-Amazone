import { ICart } from "../Interfaces";
import express, { Request, Response } from "express";
import { CartServices } from "../Services";
import { newrequest } from "../Middlewares/VerifyToken.Middleware";
const CartService = new CartServices();

export class CartController {
  async GetCart(req: newrequest, res: Response) {
    try {
      const userId = req.userId;
      const data = await CartService.GetCart(userId);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }

  async AddCartProduct(req: newrequest, res: Response) {
    try {
      const userId = req.userId;
      const { pid, qty } = req.body;
      const data = await CartService.AddCartProduct({ userId, pid, qty });
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async GetCartProduct(req: newrequest, res: Response) {
    try {
      const userId = req.userId;
      const { pid, qty } = req.body;
      const data = await CartService.GetCartProduct(userId);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async DeleteCartProduct(req: newrequest, res: Response) {
    try {
      const userId = req.userId;
      const { pid } = req.params;
      const data = await CartService.DeleteCartProduct({ userId, pid });
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async UpdateCartProduct(req: newrequest, res: Response) {
    try {
      const userId = req.userId;
      const { pid, qty } = req.body;
      const data = await CartService.UpdateCartProduct({ userId, pid, qty });
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
}

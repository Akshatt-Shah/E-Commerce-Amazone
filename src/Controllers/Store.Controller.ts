import express, { Request, Response, json } from "express";
import { IStore } from "../Interfaces";
import { StoreServices } from "../Services";
import { newrequest } from "../Middlewares/VerifyToken.Middleware";
const StoreService = new StoreServices();

export class StoreControllers {
  async CreateStore(req: newrequest, res: Response) {
    try {
      let data: IStore = req.body;
      const sellerid = req.sellerId;
      data.seller_id = sellerid;
      const Storedata = await StoreService.CreateStore(data);
      res.status(200).json(Storedata);
    } catch (error: any) {
      res.status(400), json(error.message);
    }
  }
  async GetSellerStore(req: newrequest, res: Response) {
    try {
      const sellerid = req.sellerId;
      const Storedata = await StoreService.GetStore(sellerid);
      res.status(200).json(Storedata);
    } catch (error: any) {
      res.status(400), json(error.message);
    }
  }
  async GetAllStore(req: newrequest, res: Response) {
    try {
      const Storedata = await StoreService.GetAllStore();
      res.status(200).json(Storedata);
    } catch (error: any) {
      res.status(400), json(error.message);
    }
  }
  async UpdateStore(req: newrequest, res: Response) {
    try {
      const { store_id } = req.params;
      // console.log(store_id)
      let data: IStore = req.body;
      const sellerid = req.sellerId;
      data.seller_id = sellerid;
      const Storedata = await StoreService.UpdateSellerStore(store_id, data);
      res.status(200).json(Storedata);
    } catch (error: any) {
      res.status(400), json(error.message);
    }
  }
  async DeleteSellerStore(req: newrequest, res: Response) {
    try {
      const { store_id } = req.params;
      const sellerid = req.sellerId;
      const Storedata = await StoreService.DeleteSellerStore(store_id,sellerid);
      res.status(200).json(Storedata);
    } catch (error: any) {
      res.status(400), json(error.message);
    }
  }
  async DeleteStore(req: newrequest, res: Response) {
    try {
      const { store_id } = req.params;
      const Storedata = await StoreService.DeleteStore(store_id);
      res.status(200).json(Storedata);
    } catch (error: any) {
      res.status(400), json(error.message);
    }
  }
}

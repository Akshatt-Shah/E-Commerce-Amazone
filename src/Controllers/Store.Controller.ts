import express, { Request, Response, json } from "express";
import { IStore } from "../Interfaces";
import { StoreServices } from "../Services/Store.Services";
const StoreService = new StoreServices();

export class StoreControllers {
  async CreateStore(req: Request, res: Response) {
    try {
      const data: IStore = req.body;
      const Storedata = await StoreService.CreateStore(data);
      res.status(200).json(Storedata);
    } catch (error: any) {
      res.status(400), json(error.message);
    }
  }
}

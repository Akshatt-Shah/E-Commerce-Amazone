import express, { Request, Response } from "express";
import { IProduct } from "../Interfaces";
import { products } from "../Models";
import { ProductServices } from "../Services";
import { newrequest } from "../Middlewares/VerifyToken.Middleware";
const ProductService = new ProductServices();
export class ProductController {
  async CreateProduct(req: newrequest, res: Response) {
    try {
      const sellerid = req.sellerId;
      console.log(sellerid);
      const data: IProduct = req.body;
      const productdata = await ProductService.CreateProduct(sellerid, data);
      res.status(200).json(productdata);
    } catch (error: any) {}
  }
  async GetProduct(req: newrequest, res: Response) {
    try {
      const sellerid = req.sellerId;
      console.log(sellerid);
      const { storeid } = req.params;
      const productdata = await ProductService.GetProduct(sellerid, storeid);
      res.status(200).json(productdata);
    } catch (error: any) {}
  }
  async GetAllProduct(req: newrequest, res: Response) {
    try {
      const sellerid = req.sellerId;
      console.log(sellerid);
      const { storeid } = req.params;
      const  SearchTerm:any  = req.query;
      const productdata = await ProductService.GetAllProduct(SearchTerm);
      res.status(200).json(productdata);
    } catch (error: any) {}
  }
  async UpdateProduct(req: newrequest, res: Response) {
    try {
      const { pid } = req.params;
      const sellerid = req.sellerId;
      console.log(sellerid);
      const data: IProduct = req.body;
      const productdata = await ProductService.UpdateProduct(
        pid,
        sellerid,
        data
      );
      res.status(200).json(productdata);
    } catch (error: any) {}
  }
  async DeleteProduct(req: newrequest, res: Response) {
    try {
      const { pid } = req.params;
      //   const sellerid = req.sellerId;
      //   console.log(sellerid);
      const data: IProduct = req.body;
      const productdata = await ProductService.DeleteProduct(pid);
      res.status(200).json(productdata);
    } catch (error: any) {}
  }
}

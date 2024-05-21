import express, { Request, Response } from "express";
import { ICategory } from "../Interfaces";
import { CategoryServices } from "../Services";
const CategoryService = new CategoryServices();

export class CategoryController {
  async CreateCategory(req: Request, res: Response) {
    try {
      const data: ICategory = req.body;
      const catdata = await CategoryService.Createcategory(data);
      res.status(200).json(catdata);
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async GetCategory(req: Request, res: Response) {
    try {
      const catdata = await CategoryService.Getcategory();
      res.status(200).json(catdata);
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async UpdateCategory(req: Request, res: Response) {
    try {
        const {id}= req.params;
        const data: ICategory = req.body;
      const catdata = await CategoryService.Updatecategory(id,data);
      res.status(200).json(catdata);
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async DeleteCategory(req: Request, res: Response) {
    try {
        const {id}= req.params;
      const catdata = await CategoryService.Deletecategory(id);
      res.status(200).json(catdata);
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}

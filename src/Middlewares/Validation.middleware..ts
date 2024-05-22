import {Request,Response ,NextFunction } from "express";
import { UserSchema } from "../Validation/Data.Validation";
import * as Yup from "yup";
export class Validation {
  async UserValidation(req: Request, res: Response, next: NextFunction) {
    try {
      await UserSchema.validate(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

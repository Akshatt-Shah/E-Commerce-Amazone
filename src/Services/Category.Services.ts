import { ICategory } from "../Interfaces";
import { categories } from "../Models";
import { msg } from "../utills";
export class CategoryServices {
  async Createcategory(data: ICategory) {
    try {
      const Cdata = await categories.create(data);
      return { message: msg.createdata("Category"), Data: Cdata, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }

  async Getcategory() {
    try {
      const Cdata = await categories.find();
      return { Data: Cdata, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async Updatecategory(id: any, data: ICategory) {
    try {
      const Cdata = await categories.findByIdAndUpdate(id, data);
      return { message: msg.Updatedata("Category"), Data: Cdata, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async Deletecategory(id: any) {
    try {
      const Cdata = await categories.findByIdAndDelete(id);
      return { message: msg.Deletedata("Category"), Data: Cdata, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}

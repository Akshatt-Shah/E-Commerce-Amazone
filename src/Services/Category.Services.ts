import { ICategory } from "../Interfaces";
import { categories } from "../Models";

export class CategoryServices {
  async Createcategory(data: ICategory) {
    try {
      const Cdata = await categories.create(data);
      return { message: "Category Created", Data: Cdata, status: true };
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
  async Updatecategory(id:any,data:ICategory) {
    try {
      const Cdata = await categories.findByIdAndUpdate(id,data);
      return { message: "Category Updated",Data: Cdata, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async Deletecategory(id:any) {
    try {
      const Cdata = await categories.findByIdAndDelete(id);
      return { message: "Category Deleted",Data: Cdata, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}

import { IProduct } from "../Interfaces";
import { products, stores, users } from "../Models";

export class ProductServices {
  async CreateProduct(sellerid: any, data: IProduct) {
    try {
      const storedata = await stores.find({
        _id: data.store_id,
        seller_id: sellerid,
      });
      console.log(storedata);
      if (storedata.length > 0) {
        const productdata = await products.create(data);
        return {
          data: productdata,
          message: "Product Is Created",
          status: true,
        };
      } else {
        return { message: "Seller Cannot add product in another seller Store" };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async GetProduct(sellerid: any, storeid: any) {
    try {
      const storedata = await stores.find({
        _id: storeid,
        seller_id: sellerid,
      });
      console.log(storedata);
      if (storedata.length > 0) {
        const productdata = await products.find({ store_id: storeid });
        return {
          data: productdata,
          message: "Product Is Created",
          status: true,
        };
      } else {
        return { message: "Seller Cannot add product in another seller Store" };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async UpdateProduct(pid: any, sellerid: any, data: IProduct) {
    try {
      const storedata = await stores.find({
        _id: data.store_id,
        seller_id: sellerid,
      });
      console.log(storedata);
      if (storedata.length > 0) {
        const productdata = await products.findByIdAndUpdate(pid, data);
        return {
          data: productdata,
          message: "Product Is Updated",
          status: true,
        };
      } else {
        return { message: "Seller Cannot add product in another seller Store" };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async DeleteProduct(pid: any) {
    try {
      const productdata = await products.findByIdAndDelete(pid);
      return {
        data: productdata,
        message: "Product Is Updated",
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async GetAllProduct() {
    try {
      const data = await products.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "CatagoryInfo",
          },
        },
        {
          $lookup: {
            from: "stores",
            localField: "store_id",
            foreignField: "_id",
            as: "StoreInfo",
          },
        },
        {
          $project: {
            name: 1,
            price: 1,
            description: 1,
            stock: 1,
            Category_name: { $first: ["$CatagoryInfo.name"] },
            Store_name: { $first: ["$StoreInfo.store_name"] },
          },
        },
      ]);
      return { Data: data, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}

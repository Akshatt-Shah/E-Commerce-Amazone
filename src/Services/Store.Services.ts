import { IStore } from "../Interfaces";
import { stores } from "../Models";

export class StoreServices {
  async CreateStore(data: IStore) {
    try {
      console.log(data);
      const storedata = await stores.create(data);
      return {
        Data: storedata,
        message: "Store Created Successfully",
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }

  async GetStore(sellerid: any) {
    try {
      const storedata = await stores.find({ seller_id: sellerid });
      return {
        Data: storedata,
        message: "Store Retrieved Successfully",
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }

  async GetAllStore() {
    try {
      const storedata = await stores.find();
      return {
        Data: storedata,
        message: "Store Retrieved Successfully",
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }

  async UpdateSellerStore(id: any, data: IStore) {
    try {
      const Existsdata = await stores.find({
        _id: id,
        seller_id: data.seller_id,
      });

      if (Existsdata.length > 0) {
        const storedata = await stores.findByIdAndUpdate(id, data);
        return {
          Data: storedata,
          message: "Store Updated Successfully",
          status: true,
        };
      } else {
        return { message: "Seller cannot Update Other Store!!!!!!!!!!!!!!!!!" };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }

  async DeleteSellerStore(storeid: any, sellerid: any) {
    try {
      const Existsdata = await stores.find({
        _id: storeid,
        seller_id: sellerid,
      });

      if (Existsdata.length > 0) {
        const storedata = await stores.findByIdAndDelete({
          _id: storeid,
          seller_id: sellerid,
        });
        return {
          Data: storedata,
          message: "Store Deleted Successfully",
          status: true,
        };
      } else {
        return {
          message: "Seller cannot Deleted Other Store!!!!!!!!!!!!!!!!!",
        };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async DeleteStore(storeid: any) {
    try {
      const storedata = await stores.findByIdAndDelete(storeid);
      return {
        Data: storedata,
        message: "Store Deleted Successfully",
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}

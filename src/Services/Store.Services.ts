import { IStore } from "../Interfaces";
import { stores } from "../Models";

export class StoreServices {
  async CreateStore(data: IStore) {
    try {
      const storedata = await stores.create(data);
      return { Data: "Store Created Successfully", status: false };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }

  async GetAllStore() {}

  async GetStore() {}

  async updateStore(id: any, data: IStore) {}

  async DeleteStore(id: any) {}
}

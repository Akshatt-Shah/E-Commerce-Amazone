export interface IProduct {
  _id?: string;
  name: string;
  price: Number;
  description?: string;
  category_id: string;
  stock: Number;
  status: Boolean;
  store_id: string;
}

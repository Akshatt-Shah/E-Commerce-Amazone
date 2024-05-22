import { cartproducts, carts } from "../Models";
import { ICart, ICartProducts } from "../Interfaces";

export class CartServices {
  async GetCart(userId: any) {
    try {
      let total:any=0
      const data = await carts.find({ user_id: userId });
      const product = await cartproducts.aggregate([
        {
          $match: {
            cart_id: data[0]._id,
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "ProductInfo",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "ProductInfo.category_id",
            foreignField: "_id",
            as: "CategoryInfo",
          },
        },
        {
          $project: {
            cart_id: 1,
            productname: { $first: ["$ProductInfo.name"] },
            productprice: { $first: ["$ProductInfo.price"] },
            product_qty: 1,
            productTotal: {
              $multiply: ["$product_qty", { $first: ["$ProductInfo.price"] }],
            },
            categoryName: { $first: ["$CategoryInfo.name"] },
          },
        },
      ]);
      for(const ele of product){
        total = total + ele.productTotal
      }
      return { Data: product,TotalorderValue:total, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async AddCartProduct({ userId, pid, qty }: any) {
    try {
      const data = await carts.find({ user_id: userId });
      if (data !== null) {
        const cart: ICartProducts = {
          cart_id: data[0]._id,
          product_id: pid,
          product_qty: qty,
        };
        let cartdata = await cartproducts
          .findOne({
            product_id: pid,
            cart_id: cart.cart_id,
          })
          .select({ cart_id: 1, product_id: 1, product_qty: 1, _id: 1 });

        if (cartdata !== null) {
          //   console.log(cartdata);
          cartdata.product_qty = cartdata.product_qty + qty;
          console.log(cartdata);
          const cartproduct = await cartproducts.findByIdAndUpdate(
            cartdata._id,
            {
              cart_id: cartdata.cart_id,
              product_id: cartdata.product_id,
              product_qty: cartdata.product_qty,
            }
          );
          return { Data: cartproduct, status: true };
        } else {
          const cartproduct = await cartproducts.create(cart);
          return { Data: cartproduct, status: true };
        }
      } else {
        return { message: "User Is Not A valid", status: false };
      }
      return { Data: data, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async GetCartProduct(userId: any) {
    try {
      const data = await carts.find({ user_id: userId });
      if (data !== null) {
        const cartproduct = await cartproducts.find({ cart_id: data[0]._id });
        return { Data: cartproduct, status: true };
      } else {
        return { message: "User Is Not A valid" };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async DeleteCartProduct({ userId, pid }: any) {
    try {
      const data = await carts.find({ user_id: userId });
      if (data !== null) {
        const cartproduct = await cartproducts.deleteOne({
          cart_id: data[0]._id,
          product_id: pid,
        });
        return { Data: cartproduct, status: true };
      } else {
        return { message: "User Is Not A valid" };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }

  async UpdateCartProduct({ userId, pid, qty }: any) {
    try {
      const data = await carts.find({ user_id: userId });
      if (data !== null) {
        const cart: ICartProducts = {
          cart_id: data[0]._id,
          product_id: pid,
          product_qty: qty,
        };
        let cartdata = await cartproducts
          .findOne({
            product_id: pid,
            cart_id: cart.cart_id,
          })
          .select({ cart_id: 1, product_id: 1, product_qty: 1, _id: 1 });

        if (cartdata !== null) {
          //   console.log(cartdata);
          cartdata.product_qty = qty;
          console.log(cartdata);
          const cartproduct = await cartproducts.findByIdAndUpdate(
            cartdata._id,
            {
              cart_id: cartdata.cart_id,
              product_id: cartdata.product_id,
              product_qty: cartdata.product_qty,
            }
          );
          return { Data: cartproduct, status: true };
        } else {
          const cartproduct = await cartproducts.create(cart);
          return { Data: cartproduct, status: true };
        }
      } else {
        return { message: "User Is Not A valid", status: false };
      }
      return { Data: data, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}

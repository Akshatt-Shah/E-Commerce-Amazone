import { cartproducts, carts } from "../Models";
import { ICart, ICartProducts } from "../Interfaces";

export class CartServices {
  async GetCart(userId: any) {
    try {
      const data = await carts.find({ user_id: userId });
      return { Data: data, status: true };
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

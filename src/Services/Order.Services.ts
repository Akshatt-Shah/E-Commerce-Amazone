import { parse } from "dotenv";
import { IOrder } from "../Interfaces";
import { IOrder_Products } from "../Interfaces";
import { orders } from "../Models";
import { order_products } from "../Models";

export class OrderServices {
  async PlaceOrder(data: IOrder_Products[], userId: any) {
    try {
      let total = 0;
      const order = await orders.create({ user_id: userId });
      if (order) {
        for (const ele of data) {
          const Oproduct = await order_products.create({
            order_id: order._id,
            product_id: ele.product_id,
            product_price: ele.product_price,
            product_qty: ele.product_qty,
          });
          total = total + Number(ele.product_price) * Number(ele.product_qty);
        }

        order.total = total;
        await order.save();
        return { message: "Order Placed Successfully....", status: true };
      } else {
        return { message: "Order NOt Placed!!!!!!!!!!!!!!", status: false };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async CancelOrder(orderid: any) {
    try {
      const data = await orders.findByIdAndUpdate(orderid, {
        Iscancelled: true,
      });
      return { message: "order Cancelled......", status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async GetOrder(userid: any, orderid?: any) {
    try {
      let data = null;
      if (orderid) {
        data = await orders.find({
          user_id: userid,
          _id: orderid,
        });
        // console.log(data);
        if (data) {
          // let Orderdata = await order_products.find({ order_id: orderid });
          let Orderdata = await order_products.aggregate([
            {
              $match: {
                // "cart_id":ObjectId('664c7451c2e95835d5b4005c')
                order_id: data[0]._id,
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
                  $multiply: [
                    "$product_qty",
                    { $first: ["$ProductInfo.price"] },
                  ],
                },
                categoryName: { $first: ["$CategoryInfo.name"] },
                order_id: 1,
              },
            },
          ]);
          return { Order: Orderdata, status: true };
        } else {
          return { message: "Order Not Available", status: true };
        }
      } else {
        data = await orders.find({
          user_id: userid,
        });
        console.log(data);
        let Orderdata = [];
        for (const ele of data) {
          //   console.log(ele, "scncn");
          const data1 = await order_products.find({ order_id: ele._id });
          Orderdata.push(data1);
        }
        return { Order: Orderdata, status: true };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}

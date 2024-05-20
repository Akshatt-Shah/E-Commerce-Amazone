import { IUser } from "../Interfaces";
import { users } from "../Models";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const secretkey = process.env.SECRET_KEY || "AkshatShah";
export class UserServices {
  async CreateUser(data: IUser) {
    try {
      const userdata = await users.create(data);
      return { Data: userdata, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }

  async GetAllUser() {
    try {
      const userdata = await users
        .find()
        .select("_id name email phone_no role");
      if (userdata) {
        return { Data: userdata, status: true };
      } else {
        return { Message: "User Is Not Available", status: true };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }

  async GetUser(id: string) {
    try {
      const userdata = await users
        .findById(id)
        .select("_id name email phone_no role");
      if (userdata) {
        return { Data: userdata, status: true };
      } else {
        return { Message: "User Is Not Available", status: true };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }

  async UpdateUser(id: String, data: IUser) {
    try {
      const userdata = await users.findByIdAndUpdate(id, data);
      if (userdata) {
        return { Data: userdata, status: true };
      } else {
        return { Message: "User Is Not Available", status: true };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async DeleteUser(id: String) {
    try {
      const userdata = await users.findByIdAndDelete(id);
      if (userdata) {
        return { Data: userdata, status: true };
      } else {
        return { Message: "User Is Not Available", status: true };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async LoginUser(name: String, password: string) {
    try {
      const userdata = await users.find({ name: name });
      if (userdata) {
        const verifypassword = await bcrypt.compare(
          password,
          userdata[0].password
        );
        if (verifypassword) {
          const Token = await Jwt.sign(
            { UserToken: userdata[0]._id },
            secretkey,
            {
              expiresIn: "12h",
            }
          );

          return { message: "Login Successful", token: Token, status: true };
        } else {
          return {
            message: "Password Does not Match please provide right password",
            status: true,
          };
        }
      } else {
        return { Message: "User Is Not Available", status: true };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}

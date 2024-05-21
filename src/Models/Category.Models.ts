import mongoose, { Schema } from "mongoose";
import { ICategory } from "../Interfaces";

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    // enum: {
    //   values: [
    //     "Fridge",
    //     "Mobile",
    //     "Mixer",
    //     "Washing-Machine",
    //     "TV",
    //     "AC",
    //     "Laptop",
    //   ],
    //   message: "{VALUE} Is NotA  Valid Category",
    // },
    required: true,
    unique: true,
  },
});

export const categories = mongoose.model<ICategory>(
  "categories",
  CategorySchema
);

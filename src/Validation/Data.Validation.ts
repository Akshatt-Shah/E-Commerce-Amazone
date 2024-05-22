import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
  name: Yup.string().required(),
  password: Yup.string()
    .required()
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9]{4,}$/),
  email: Yup.string()
    .required()
    .matches(/^[a-z][a-z0-9].+@[a-z].+[a-z]{3,}$/),
  phone_no: Yup.number().required().min(10),
  role: Yup.string().required(),
});

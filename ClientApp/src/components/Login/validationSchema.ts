import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(10).max(32).required(),
});

import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username is too short"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short"),
});

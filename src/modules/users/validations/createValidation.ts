import * as Yup from "yup";

export const CreateUserSchema = Yup.object().shape({
  role_id: Yup.number().required("Role ID is required"),
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  status: Yup.string().optional(),
});

import * as yup from "yup";

const createUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  role_id: yup
    .number()
    .typeError("Role ID must be a number")
    .required("Role ID is required"),
  status: yup
    .string()
    .oneOf(["Active", "Inactive"], "Status must be 'Active' or 'Inactive'")
    .required("Status is required"),
  photo_profile: yup.string().nullable(),
});

export default createUserSchema;

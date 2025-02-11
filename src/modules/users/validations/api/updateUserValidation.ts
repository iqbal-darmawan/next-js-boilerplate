// Schema Validasi untuk Update User
import * as yup from "yup";

const updateUserSchema = yup.object({
  name: yup.string().optional(),
  username: yup.string().optional(),
  password: yup.string().optional(),
  email: yup.string().email("Invalid email format").optional(),
  role_id: yup.number().optional(),
  status: yup.string().oneOf(["Active", "Inactive"]).optional(),
});

export default updateUserSchema;

import * as yup from "yup";

// Definisikan skema validasi menggunakan yup
const listUserValidation = yup.object().shape({
  limit: yup
    .number()
    .min(1, "Limit must be at least 1")
    .integer("Limit must be an integer")
    .default(10), // Default value for limit
  offset: yup
    .number()
    .min(0, "Offset must be a non-negative number")
    .integer("Offset must be an integer")
    .default(0), // Default value for offset
  search: yup.string().optional(),
  orderBy: yup
    .string()
    .default("createdAt") // Default untuk orderBy
    .oneOf(["name", "createdAt", "email"], "Invalid orderBy field"),
  asc: yup.boolean().default(true), // Default untuk urutan menaik
});

export default listUserValidation;

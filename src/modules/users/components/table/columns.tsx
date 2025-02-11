"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserType } from "../../types/UserType";
import ActionButtons from "./ActionButtons";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      if (row.original.role && row.original.role.name === "super_admin") {
        return "Super Admin";
      } else if (row.original.role && row.original.role.name === "staff") {
        return "Staff";
      } else {
        return "-";
      }
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.original.status,
  },
  {
    header: "Action",
    accessorKey: "id", // Gunakan ID atau kunci unik lain untuk masing-masing baris
    cell: ({ row }) => <ActionButtons data={row.original} />,
  },
];

import { Entity } from "@/shared/types/entity";
import { $Enums, Role } from "@prisma/client";

export type UserType = Entity<{
  name: string;
  email: string;
  password: string;
  username: string;
  role_id: number;
  role?: Role;
  photo_profile: string | null;
  status: $Enums.userStatus;
  createdAt: Date;
  updatedAt: Date;
}>;

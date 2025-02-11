import type { PrismaClient } from "@prisma/client";

import { roleStatus } from "@prisma/client";

export default async function roleSeeder(prisma: PrismaClient) {
  console.log("Seeding roles...");

  const permissions = await prisma.permission.findMany();

  const super_admin = await prisma.role.upsert({
    where: { name: "super_admin" },
    update: {},
    create: {
      name: "super_admin",
      title: "Super Admin",
      description: "User yang mengelola keseluruhan aplikasi.",
      status: roleStatus.Active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  });

  await prisma.roleHasPermission.createMany({
    data: permissions.map((permission) => ({
      role_id: super_admin.id,
      permission_id: permission.id,
    })),
    skipDuplicates: true,
  });

  const staff = await prisma.role.upsert({
    where: { name: "staff" },
    update: {},
    create: {
      name: "staff",
      title: "Staff",
      description:
        "User yang memiliki hak akses terhadap fitur-fitur tertentu aplikasi.",
      status: roleStatus.Active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  });

  console.log({ super_admin, staff });
  console.log("Seed complete");
}

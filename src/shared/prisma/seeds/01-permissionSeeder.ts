import type { PrismaClient } from "@prisma/client";

export default async function permissionSeeder(prisma: PrismaClient) {
  console.log("Seeding permissions...");
  console.log("process.env.DATABASE_URL ", process.env.DATABASE_URL);

  // Create parent permission 'User'
  const user = await prisma.permission.create({
    data: {
      name: "user",
      title: "User",
      parent_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  });

  await prisma.permission.create({
    data: {
      name: "user_read",
      title: "Read User",
      parent_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  });

  await prisma.permission.create({
    data: {
      name: "user_create",
      title: "Create User",
      parent_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  });

  await prisma.permission.create({
    data: {
      name: "user_update",
      title: "Update User",
      parent_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  });

  await prisma.permission.create({
    data: {
      name: "user_delete",
      title: "Delete User",
      parent_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  });

  console.log("Permissions seeded");
}

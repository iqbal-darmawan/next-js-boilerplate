import type { PrismaClient } from "@prisma/client";
import { userStatus } from "@prisma/client";
import { hash } from "bcryptjs";
import { faker } from "@faker-js/faker";

export default async function userSeeder(prisma: PrismaClient) {
  console.log("Seeding users...");
  console.log("process.env.DATABASE_URL ", process.env.DATABASE_URL);

  const hashedPassword = await hash("password123", 10);

  const roles = await prisma.role.findMany();

  if (!roles.length) {
    console.log("No Roles found. Skipping User seeding.");

    return;
  }

  const superAdminRole = await prisma.role.findFirst({
    where: {
      name: "super_admin",
    },
  });

  const superAdmin = await prisma.user.create({
    data: {
      id: faker.string.uuid(),
      role_id: superAdminRole?.id,
      name: "Super Admin",
      username: "Super_admin_abangku",
      password: hashedPassword,
      email: "superadmin@gmail.com",
      photo_profile: faker.image.avatar(),
      status: userStatus.Active,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  console.log(superAdmin);

  const users = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    role_id: faker.helpers.arrayElement(roles).id,
    name: faker.person.fullName(),
    username: faker.internet.username(),
    password: hashedPassword,
    email: faker.internet.email(),
    photo_profile: faker.image.avatar(),
    status: faker.helpers.enumValue(userStatus),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("Seed completed.");
}

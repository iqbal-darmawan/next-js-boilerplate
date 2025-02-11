import { hash } from "bcryptjs";
import listUserValidation from "@/modules/users/validations/api/listUserValidation";
import { NextRequest } from "next/server";
import prisma from "@/shared/lib/prisma"; // Prisma Client
import * as yup from "yup";
import { successResponse } from "@/shared/helpers/successResponse";
import { errorResponse } from "@/shared/helpers/errorResponse";
import createUserSchema from "@/modules/users/validations/api/addUserValidation";
// Helper function untuk konversi dan validasi parameter
const parseQueryParam = (
  param: string | null,
  defaultValue: number,
  isPositive: boolean = true
) => {
  const value = param ? Number(param) : defaultValue;
  if (
    isNaN(value) ||
    (isPositive && value <= 0) ||
    (!isPositive && value < 0)
  ) {
    throw new Error(
      `Invalid value for '${param}'. It must be a valid ${
        isPositive ? "positive" : "non-negative"
      } number.`
    );
  }
  return value;
};

export async function GET(request: NextRequest) {
  try {
    // Mengambil parameter query dari URL
    const { searchParams } = request.nextUrl;

    // Mengambil nilai dari query parameters
    const limitParam = searchParams.get("limit");
    const offsetParam = searchParams.get("offset");
    const search = searchParams.get("search");
    const orderBy = searchParams.get("orderBy");
    const asc = searchParams.get("asc");

    // Konversi dan validasi limit dan offset menggunakan helper
    const limit = parseQueryParam(limitParam, 10);
    const offset = parseQueryParam(offsetParam, 0, false);

    // Validasi input dengan Yup
    const validatedParams = await listUserValidation.validate({
      limit: limit ? Number(limit) : undefined, // Mengkonversi string ke number
      offset: offset ? Number(offset) : undefined, // Mengkonversi string ke number
      search,
      orderBy: orderBy ? orderBy : "createdAt",
      asc: asc ? asc === "true" : undefined, // Mengkonversi string ke boolean
    });

    // Membuat filter pencarian berdasarkan parameter 'search'
    const searchCondition = validatedParams.search
      ? {
          OR: [
            {
              name: {
                contains: validatedParams.search,
              },
            },
            {
              email: { contains: validatedParams.search },
            },
          ],
        }
      : {};

    // Menghitung total user sesuai filter
    const totalCount = await prisma.user.count({
      where: searchCondition,
    });

    // Menghitung total halaman
    const totalPages = Math.ceil(totalCount / validatedParams.limit);

    // Menghitung halaman saat ini
    const currentPage =
      Math.floor(validatedParams.offset / validatedParams.limit) + 1;

    // Query ke database untuk mendapatkan user dengan pagination dan pencarian
    const users = await prisma.user.findMany({
      where: searchCondition,
      take: validatedParams.limit,
      skip: validatedParams.offset,
      orderBy: {
        [validatedParams.orderBy]: validatedParams.asc ? "asc" : "desc",
      },
      include: { role: true },
    });

    return successResponse(200, {
      data: users,
      totalCount,
      totalPages,
      currentPage,
    });
  } catch (error) {
    // Menangani error validasi atau query
    if (error instanceof yup.ValidationError) {
      return errorResponse(400, error?.errors.join(", "));
    }

    // Menangani error lainnya
    console.error(error);
    return errorResponse(500, "Internal Server Error");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validasi Input
    await createUserSchema.validate(body);

    const password = await hash(body.password, 10);

    // Validasi Email Unik
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existingUser) {
      return errorResponse(400, "Email already exists");
    }

    // Buat User
    const user = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        password: password, // Pastikan hashing password!
        email: body.email,
        role_id: Number(body.role_id),
        status: body.status,
        photo_profile: body.photo_profile || null,
      },
    });

    return successResponse(200, user, "User created successfully");
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return errorResponse(400, error?.errors.join(", "));
    }
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return errorResponse(500, errorMessage);
  }
}

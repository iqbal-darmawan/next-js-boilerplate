import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import * as yup from "yup";
import { errorResponse } from "@/shared/helpers/errorResponse";
import { successResponse } from "@/shared/helpers/successResponse";
import updateUserSchema from "@/modules/users/validations/api/updateUserValidation";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      return errorResponse(404, "User not found");
    }

    return successResponse(200, user);
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return errorResponse(500, errorMessage, "An error occurred");
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const body = await req.json();

    // Validasi Input
    await updateUserSchema.validate(body);

    if (!id) return errorResponse(400, "User ID is required");

    // Update User
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        name: body.name,
        username: body.username,
        password: body.password, // Jangan lupa hashing!
        email: body.email,
        role_id: Number(body.role_id),
        status: body.status,
        photo_profile: body.photo_profile,
      },
    });

    return successResponse(200, user, "User updated successfully");
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return errorResponse(400, error?.errors.join(", "));
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return errorResponse(400, errorMessage, "An error occurred");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return errorResponse(400, errorMessage, "An error occurred");
  }
}

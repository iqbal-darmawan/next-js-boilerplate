// Next Imports
import bcrypt from "bcryptjs";

import prisma from "@/shared/lib/prisma";
import { successResponse } from "@/shared/helpers/successResponse";
import { errorResponse } from "@/shared/helpers/errorResponse";

// Mock data for demo purpose

export async function POST(req: Request) {
  // Vars
  const { username, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: { username },
    include: { role: true },
  });

  if (user) {
    // We check password here
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (passwordMatches) {
      const response = Object.fromEntries(
        Object.entries(user).filter(([key]) => key !== "password")
      );

      return successResponse(200, response);
    } else {
      return errorResponse(
        401,
        "Unauthorized Access",
        "Email or Password is invalid"
      );
    }
  } else {
    // We return 401 status code and error message if user is not found
    return errorResponse(
      401,
      "Unauthorized Access",
      "Email or Password is invalid"
    );
  }
}

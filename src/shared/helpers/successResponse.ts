import { NextResponse } from "next/server";

/**
 * Helper untuk membuat response sukses menggunakan NextResponse.
 * @param statusCode - HTTP status code (default 200)
 * @param data - Data yang akan dikirimkan dalam response
 * @param message - Pesan sukses (default "Success"")
 * @returns NextResponse instance
 */
export const successResponse = <T>(
  statusCode: number = 200,
  data: T,
  message: string = "Success"
) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: statusCode }
  );
};
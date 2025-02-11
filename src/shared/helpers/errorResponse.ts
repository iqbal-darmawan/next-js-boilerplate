import { NextResponse } from "next/server";

/**
 * Helper untuk membuat response error menggunakan NextResponse.
 * @param statusCode - HTTP status code (default 500)
 * @param error - Error detail atau deskripsi error
 * @param message - Pesan error (default "An error occurred")
 * @param details - Detail tambahan untuk debugging (opsional)
 * @returns NextResponse instance
 */
export const errorResponse = (
  statusCode: number = 500,
  error: string | Record<string, unknown> | string[],
  message: string = "An error occurred",
  details?: Record<string, unknown>
) => {
  console.log("🚀 ~ error:", error)
  return NextResponse.json(
    {
      success: false,
      message,
      error,
      ...(details ? { details } : {}),
    },
    { status: statusCode }
  );
};

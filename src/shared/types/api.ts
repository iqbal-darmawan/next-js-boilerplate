/* Base class response bisa ditambahakan */
type BaseResponse = {
  success: boolean;
  message: string;
  statusCode: number;
}

// Success response type
export type SuccessResponse<T> = BaseResponse & {
  data?: T; // Optional data field for flexibility
};

// Error response type
export type ErrorResponse = BaseResponse & {
  error?: string; // Optional error field for custom messages
  details?: Record<string, unknown>; // Additional error details if needed
};

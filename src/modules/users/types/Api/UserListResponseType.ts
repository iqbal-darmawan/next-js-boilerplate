import { UserType } from "../UserType";

export type UserListResponseType = {
  success: boolean;
  message: string;
  data: {
    data : UserType[],
    totalCount: number,
    totalPages: number,
    currentPage: number
  };
};

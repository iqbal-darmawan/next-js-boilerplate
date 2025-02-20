import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserListResponseType } from "../../types/Api/UserListResponseType";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;
console.log("🚀 ~ BASE_URL:", BASE_URL);

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({
        limit = 10,
        page = 1,
        search = "",
        orderBy = "createdAt",
        asc = "false",
      }) => {
        const offset = (page - 1) * limit;
        return `/users?limit=${limit}&offset=${offset}&search=${search}&orderBy=${orderBy}&asc=${asc}`;
      },
      transformResponse: (response: UserListResponseType) => response.data,
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi;

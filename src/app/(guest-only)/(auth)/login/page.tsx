"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginSchema } from "@/modules/auth/validations/loginValidation";
import { LoginFormType } from "@/modules/auth/types/loginFormType";

export default function Login() {
  // hooks
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormType) => {
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res && res.ok && res.error === null) {
      // Vars
      const redirectURL = searchParams.get("callbackUrl") ?? "/admin";

      router.replace(redirectURL);
    } else {
      if (res?.error) {
        const error = JSON.parse(res.error);

        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              {...register("username")}
              type="text"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-rose-400"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-2">
                {errors.username?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              {...register("password")}
              type="password"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-rose-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-rose-500 rounded hover:bg-rose-600 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

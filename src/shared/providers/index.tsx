import { ReactNode } from "react";
import { NextAuthProvider } from "./nextAuthProvider";
import ReduxProvider from "./reduxProvider";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <NextAuthProvider>
      <ReduxProvider>
          {children}
      </ReduxProvider>
    </NextAuthProvider>
  );
};

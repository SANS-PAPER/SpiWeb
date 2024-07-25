"use client";

import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import Loader from "@/components/common/Loader";
import { useUser, UserProvider as Auth0Provider, UserProfile } from '@auth0/nextjs-auth0/client';
import { getAccessToken } from '@auth0/nextjs-auth0';
import SignIn from "./loginpage";
import LoginApi from "@/store/user/loginAuth0";
import AuthWrapper from "@/wrapper/AuthWrapper";
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Auth0Provider>
        <QueryClientProvider client={queryClient}>
          <body suppressHydrationWarning={true}>
            <AuthWrapper>
              <div className="dark:bg-boxdark-2 dark:text-bodydark">
                {children}
                {/* <a href="/api/auth/logout">Logout</a> */}
              </div>
            </AuthWrapper>
          </body>
        </QueryClientProvider>
      </Auth0Provider>
    </html>
  );
}
"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";

import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

import { members } from "@wix/members";

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

const myWixContext = createClient({
  modules: { products, collections, currentCart, members },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "",
    tokens: { refreshToken, accessToken: { value: "", expiresAt: 0 } },
  }),
});

export type WixClient = typeof myWixContext;

export const WixContext = createContext<WixClient>(myWixContext);

export const WixContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WixContext.Provider value={myWixContext}>{children}</WixContext.Provider>
  );
};

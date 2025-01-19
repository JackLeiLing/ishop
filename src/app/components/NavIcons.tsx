"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Cart from "./Cart";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";

export default function NavIcons() {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();

  const { counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [getCart]);

  const handleProfile = () => {
    if (!isLoggedIn) {
      console.log("pushing to login page");
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  // Auth with WIX-MANAGED AUTH
  // const wixClient = useWixClient();
  // const login = async () => {
  //   const loginRequestData = wixClient.auth.generateOAuthData(
  //     "http://localhost:3000"
  //   );
  //   console.log(loginRequestData);
  //   localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));

  //   const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
  //   console.log(authUrl);
  //   window.location.href = authUrl;
  // };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    router.push(logoutUrl);
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt="phone"
        width={22}
        height={22}
        onClick={() => setIsProfileOpen(true)}
        // onClick={}
      />
      {isProfileOpen && (
        <div className="absolute top-12 left-0 w-full rounded-md p-2 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-2 z-50">
          <button onClick={() => handleProfile()}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <Image src="/notification.png" alt="phone" width={22} height={22} />
      <div className="relative cursor-pointer">
        <Image
          src="/cart.png"
          alt="phone"
          width={22}
          height={22}
          onClick={() => setIsCartOpen((pre) => (pre = !pre))}
        />
        <div className="absolute -top-3 -right-3 w-5 h-5 bg-red-700 rounded-full text-white text-sm flex justify-center items-center">
          {counter}
        </div>
      </div>
      {isCartOpen && <Cart />}
    </div>
  );
}

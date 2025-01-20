import { create } from "zustand";
import { WixClient } from "@/context/wixContext";

type User = {
  userName: String;
};

type UserState = {
  user: User;
  loggedIn: Boolean;
  login: (wixClient: WixClient, email: string, password: string) => void;
  logout: (wixClient: WixClient) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: { userName: "" },
  loggedIn: false,
  login: async (wixClient: WixClient, email, password) => {
    await wixClient.auth.login({ email, password });
    set({
      user: { userName: email },
    });
  },

  logout: (wixClient: WixClient) => {},
}));

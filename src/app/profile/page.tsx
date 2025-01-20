import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import { redirect } from "next/navigation";
import React from "react";
import UpdateProfileButton from "../components/UpdateProfileButton";
import { updateUser } from "@/lib/actions";

export default async function ProfilePage() {
  // const wixClient = await wixClientServer();

  // const isLoggedIn = await wixClient.auth.loggedIn();
  // if (!isLoggedIn) redirect("/login");
  // const user = await wixClient.members.getCurrentMember({
  //   fieldsets: [members.Set.FULL],
  // });

  const user = {
    member: {
      profile: { nickname: "yan" },
      loginEmail: "yan@email.com",
      contactId: "fdsa",
    },
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center h-[calc(100vh-80px)] bg-gray-200">
      <h1 className="text-2xl">Hello {user.member?.profile?.nickname}</h1>
      <p>{user.member?.loginEmail}</p>

      <form>
        <input
          type="text"
          hidden
          value={user.member?.contactId || ""}
          name="id"
          readOnly
        />
        <div className="flex flex-col gap-3 items-left">
          <label className="text-sm text-gray-700" htmlFor="">
            User Name
          </label>
          <input
            type="text"
            name="userName"
            placeholder={user.member?.profile?.nickname!}
            className="ring-1 ring-gray-800 bg-white rounded-lg h-8 px-4 py-2 mb-2"
          />
        </div>

        {/* <UpdateProfileButton /> */}
      </form>
    </div>
  );
}

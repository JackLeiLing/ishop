import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProfilePage() {
  const wixClient = await wixClientServer();

  const isLoggedIn = await wixClient.auth.loggedIn();
  if (!isLoggedIn) redirect("/login");
  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });
  return (
    <div>
      <h1>{user.member?.profile?.nickname}</h1>
      <p>{user.member?.loginEmail}</p>
    </div>
  );
}

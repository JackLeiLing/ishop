"use server";

import { wixClientServer } from "@/lib/wixClientServer";

export const updateUser = async (formData: FormData) => {
  console.log(formData);
  const wixClient = await wixClientServer();
  const userName = formData.get("userName") as string;
  const id = formData.get("id") as string;
  try {
    wixClient.members.updateMember(id, {
      profile: { nickname: userName || undefined },
    });
  } catch (error) {
    console.log(error);
  }
};

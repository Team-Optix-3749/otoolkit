import { ClientResponseError } from "pocketbase";

import { pb } from "@/lib/pbaseClient";
import { PB_Codes } from "@/lib/states";
import { Dispatch, SetStateAction } from "react";
import { t_pb_User, type t_pb_UserData } from "../types";
import { setPocketbaseCookie } from "../pbaseServer";

export async function newUser(email: string, password: string, name: string) {
  try {
    const preExisting = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);

    if (preExisting.id) return ["ALREADY_EXISTS", null];
  } catch (error: any) {
    console.warn(error);
  }

  const res1 = await createUser(email, password, name);
  if (res1[0] instanceof ClientResponseError) {
    return [PB_Codes[res1[0].status as keyof typeof PB_Codes], null];
  }

  return [null, res1[1]];
}

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  try {
    const user = await pb.collection("users").create({
      email,
      password,
      passwordConfirm: password,
      emailVisibility: true,
      name,
      role: "member"
    });

    return [null, user.id];
  } catch (error: any) {
    console.log("User creation failed:", error);

    return [error, null];
  }
}

export function registerAuthCallback(
  setUser: Dispatch<SetStateAction<t_pb_User | null>>
) {
  return pb.authStore.onChange(async (token, record) => {
    setUser(record as t_pb_User);
    setPocketbaseCookie(pb.authStore.exportToCookie());
  }, true);
}
export async function listUserData(page: number, perPage: number) {
  return await pb.collection("UserData").getList<t_pb_UserData>(page, perPage, {
    expand: "user"
  });
}

export async function listAllUsers() {
  const users = await pb.collection("users").getFullList<t_pb_User>({
    sort: "name"
  });
  return users.toSorted((a, b) => a.name.localeCompare(b.name));
}

"use server";

import {
  RequestCookie,
  RequestCookies
} from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const PB_AUTH_COOKIE_NAME = "pb_auth_token";
const PB_AUTH_COOKIE_EXP_DAYS =
  parseInt(process.env.COOKIE_EXPIRATION_DAYS || "") || 30;

const cookieExpirationMS = 1000 * 60 * 60 * 24 * PB_AUTH_COOKIE_EXP_DAYS;

export async function setPBAuthCookie(value: string) {
  const cookieStore = await cookies();
  cookieStore.set(PB_AUTH_COOKIE_NAME, value, {
    expires: new Date(Date.now() + cookieExpirationMS),
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    domain: process.env.COOKIE_DOMAIN || undefined
  });
}

export async function getPBAuthCookie() {
  const cookieStore = await cookies();
  return getPBAuthCookieWithGetter((key: string) => cookieStore.get(key));
}

export async function getPBAuthCookieWithGetter(
  getter: (key: string) => RequestCookie | undefined
) {
  return getter(PB_AUTH_COOKIE_NAME)?.value || "";
}

export async function clearPBAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(PB_AUTH_COOKIE_NAME);
}

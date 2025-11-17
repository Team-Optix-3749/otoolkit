import { BaseStates, SimpleLoginStates, SignupStates } from "./types/states";
import { logger } from "./logger";
import { getSBBrowserClient } from "./sbClient";

function validateEmail(value: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(value).toLowerCase());
}

function validateName(value: string) {
  const re = /^[A-Za-z0-9]+$/;
  return re.test(String(value));
}

export async function loginEmailPass(
  email: string,
  password: string
): Promise<SimpleLoginStates> {
  if (!email) return SimpleLoginStates.ERR_EMAIL_NOT_PROVIDED;
  if (!password) return SimpleLoginStates.ERR_PASSWORD_NOT_PROVIDED;

  const trimmedEmail = email.trim();
  if (!validateEmail(trimmedEmail)) {
    return SimpleLoginStates.ERR_INVALID_EMAIL;
  }

  if (password.length < 8) {
    return SimpleLoginStates.ERR_PASSWORD_TOO_SHORT;
  }

  const supabase = getSBBrowserClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: trimmedEmail,
    password
  });

  if (error) {
    return SimpleLoginStates.ERR_INCORRECT_PASSWORD;
  }

  return SimpleLoginStates.SUCCESS;
}

export async function loginOAuth(provider: "google" | "discord") {
  const supabase = getSBBrowserClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider
  });

  if (error) {
    logger.error(
      { provider, err: error.message },
      "Supabase OAuth login failed"
    );
    return BaseStates.ERROR;
  }

  return BaseStates.SUCCESS;
}

export async function signupEmailPass(
  email: string,
  password1: string,
  password2: string,
  name: string
): Promise<SignupStates> {
  if (!email) return SignupStates.ERR_EMAIL_NOT_PROVIDED;
  if (!password1) return SignupStates.ERR_PASSWORD_NOT_PROVIDED;
  if (!password2) return SignupStates.ERR_PASSWORD_NOT_PROVIDED;
  if (!name) return SignupStates.ERR_NAME_NOT_PROVIDED;

  const trimmedEmail = email.trim();
  const trimmedName = name.trim();

  if (!validateEmail(trimmedEmail)) {
    return SignupStates.ERR_INVALID_EMAIL;
  }

  if (trimmedName.length < 3) {
    return SignupStates.ERR_NAME_TOO_SHORT;
  }

  if (!validateName(trimmedName)) {
    return SignupStates.ERR_INVALID_NAME;
  }

  if (password1 !== password2) {
    return SignupStates.ERR_PASSWORDS_DONT_MATCH;
  }

  if (password1.length < 8) {
    return SignupStates.ERR_PASSWORD_TOO_SHORT;
  }

  const supabase = getSBBrowserClient();

  const { data, error } = await supabase.auth.signUp({
    email: trimmedEmail,
    password: password1,
    options: {
      data: {
        full_name: trimmedName,
        role: "member",
        uses_oauth: false
      }
    }
  });

  if (error) {
    if (error.message?.toLowerCase().includes("user already registered")) {
      return SignupStates.ERR_ALREADY_EXISTS;
    }

    logger.error(
      { email: trimmedEmail, err: error.message },
      "Supabase signup failed"
    );
    return SignupStates.ERR_UNKNOWN;
  }

  const user = data.user;

  if (user) {
    const { error: upsertError } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: trimmedEmail,
        full_name: trimmedName,
        role: "member",
        uses_oauth: false
      },
      {
        onConflict: "id"
      }
    );

    if (upsertError) {
      logger.error(
        { err: upsertError.message },
        "Failed to upsert profile during signup"
      );
    }
  }

  const loginResult = await loginEmailPass(trimmedEmail, password1);
  if (loginResult === SimpleLoginStates.SUCCESS) {
    return SignupStates.SUCCESS;
  }

  return SignupStates.ERR_UNKNOWN;
}

export async function logout() {
  const supabase = getSBBrowserClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    logger.error({ err: error.message }, "Supabase sign out failed");
  }

  window?.location.reload();
}

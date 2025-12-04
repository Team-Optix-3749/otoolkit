export enum BaseStates {
  SUCCESS,
  ERROR,
  LOADING
}

export enum LoginStates {
  SUCCESS = "SUCCESS",
  ERR_EMAIL_NOT_PROVIDED = "ERR_EMAIL_NOT_PROVIDED",
  ERR_PASSWORD_NOT_PROVIDED = "ERR_PASSWORD_NOT_PROVIDED",
  ERR_INVALID_EMAIL = "ERR_INVALID_EMAIL",
  ERR_PASSWORD_TOO_SHORT = "ERR_PASSWORD_TOO_SHORT",
  ERR_UNKNOWN = "ERR_UNKNOWN",
  ERR_EMAIL_NOT_FOUND = "ERR_EMAIL_NOT_FOUND",
  ERR_INCORRECT_PASSWORD = "ERR_INCORRECT_PASSWORD",
  ERR_USER_USES_OAUTH = "ERR_USER_USES_OAUTH"
}

export enum SignupStates {
  SUCCESS = "SUCCESS",
  ERR_EMAIL_NOT_PROVIDED = "ERR_EMAIL_NOT_PROVIDED",
  ERR_PASSWORD_NOT_PROVIDED = "ERR_PASSWORD_NOT_PROVIDED",
  ERR_NAME_NOT_PROVIDED = "ERR_NAME_NOT_PROVIDED",
  ERR_PASSWORDS_DONT_MATCH = "ERR_PASSWORDS_DONT_MATCH",
  ERR_INVALID_EMAIL = "ERR_INVALID_EMAIL",
  ERR_INVALID_NAME = "ERR_INVALID_NAME",
  ERR_PASSWORD_TOO_SHORT = "ERR_PASSWORD_TOO_SHORT",
  ERR_NAME_TOO_SHORT = "ERR_NAME_TOO_SHORT",
  ERR_ALREADY_EXISTS = "ERR_ALREADY_EXISTS",
  ERR_UNKNOWN = "ERR_UNKNOWN"
}

export const ErrorToString = {
  "00x01": "ENV_NOT_SET",
  "01x01": "UNKNOWN",
  "01x02": "ABORTED",
  "01x03": "ALREADY_EXISTS",
  "01x400": "INVALID",
  "01x403": "UNAUTHORIZED",
  "01x404": "NOT_FOUND"
} as const;
export type ErrorCodes = keyof typeof ErrorToString;

export function stateToMessage(
  state: BaseStates | LoginStates | SignupStates | ErrorCodes
): string {
  if (state in BaseStates) {
    switch (state) {
      case BaseStates.SUCCESS:
        return "Operation completed successfully.";
      case BaseStates.ERROR:
        return "An error occurred during the operation.";
      case BaseStates.LOADING:
        return "The operation is currently in progress.";
    }
  }

  if (state in LoginStates) {
    switch (state) {
      case LoginStates.SUCCESS:
        return "Login successful.";
      case LoginStates.ERR_EMAIL_NOT_PROVIDED:
        return "Email not provided.";
      case LoginStates.ERR_PASSWORD_NOT_PROVIDED:
        return "Password not provided.";
      case LoginStates.ERR_INVALID_EMAIL:
        return "Invalid email format.";
      case LoginStates.ERR_PASSWORD_TOO_SHORT:
        return "Password is too short.";
      case LoginStates.ERR_UNKNOWN:
        return "An unknown error occurred during login.";
      case LoginStates.ERR_EMAIL_NOT_FOUND:
        return "Email not found.";
      case LoginStates.ERR_INCORRECT_PASSWORD:
        return "Incorrect password.";
      case LoginStates.ERR_USER_USES_OAUTH:
        return "User uses OAuth for authentication.";
    }
  }

  if (state in SignupStates) {
    switch (state) {
      case SignupStates.SUCCESS:
        return "Signup successful.";
      case SignupStates.ERR_EMAIL_NOT_PROVIDED:
        return "Email not provided.";

      case SignupStates.ERR_PASSWORD_NOT_PROVIDED:
        return "Password not provided.";
      case SignupStates.ERR_NAME_NOT_PROVIDED:
        return "Name not provided.";
      case SignupStates.ERR_PASSWORDS_DONT_MATCH:
        return "Passwords do not match.";
      case SignupStates.ERR_INVALID_EMAIL:
        return "Invalid email format.";
      case SignupStates.ERR_INVALID_NAME:
        return "Invalid name format.";
      case SignupStates.ERR_PASSWORD_TOO_SHORT:
        return "Password is too short.";
      case SignupStates.ERR_NAME_TOO_SHORT:
        return "Name is too short.";
      case SignupStates.ERR_ALREADY_EXISTS:
        return "An account with this email already exists.";
      case SignupStates.ERR_UNKNOWN:
        return "An unknown error occurred during signup.";
    }
  }

  if (state in ErrorToString) {
    return `Error: ${ErrorToString[state as ErrorCodes]}.`;
  }

  return "Unknown Error.";
}

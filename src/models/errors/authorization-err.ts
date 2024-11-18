import { HttpStatusCodes, HttpStatusMessages } from "@/constants/https/codes";
import { CustomError } from "./custom-err";

class AuthorizationError extends CustomError {
  constructor(cause?: string, data?: any) {
    super(
      HttpStatusCodes.FORBIDDEN,
      HttpStatusMessages[HttpStatusCodes.FORBIDDEN],
      cause,
      data
    );
  }
}

const isAuthorizationError = (
  candidate: any
): candidate is AuthorizationError => {
  return (
    candidate instanceof AuthorizationError ||
    candidate?.code === HttpStatusCodes.FORBIDDEN
  );
};

export { AuthorizationError, isAuthorizationError };

import { HttpStatusCodes, HttpStatusMessages } from "@/constants/https/codes";
import { CustomError } from "./custom-err";

class AuthenticationError extends CustomError {
  constructor(cause?: string, data?: any) {
    super(
      HttpStatusCodes.UNAUTHORIZED,
      HttpStatusMessages[HttpStatusCodes.UNAUTHORIZED],
      cause,
      data
    );
  }
}

const isAuthenticationError = (
  candidate: any
): candidate is AuthenticationError => {
  return (
    candidate instanceof AuthenticationError ||
    candidate?.code === HttpStatusCodes.UNAUTHORIZED
  );
};

export { AuthenticationError, isAuthenticationError };

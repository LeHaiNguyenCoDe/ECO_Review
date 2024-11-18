import { HttpStatusCodes, HttpStatusMessages } from "@/constants/https/codes";
import { CustomError } from "./custom-err";

class NotFoundError extends CustomError {
  constructor(cause?: string, data?: any) {
    super(
      HttpStatusCodes.NOT_FOUND,
      HttpStatusMessages[HttpStatusCodes.NOT_FOUND],
      cause,
      data
    );
  }
}

const isNotFoundError = (candidate: any): candidate is NotFoundError => {
  return (
    candidate instanceof NotFoundError ||
    candidate?.code === HttpStatusCodes.NOT_FOUND
  );
};

export { NotFoundError, isNotFoundError };

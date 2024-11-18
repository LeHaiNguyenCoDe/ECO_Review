import { HttpStatusCodes, HttpStatusMessages } from "@/constants/https/codes";
import { CustomError } from "./custom-err";

class ValidationError extends CustomError {
  constructor(cause?: string, data?: any) {
    super(
      HttpStatusCodes.CONFLICT || HttpStatusCodes.UNPROCESSABLE_CONTENT,
      HttpStatusMessages[HttpStatusCodes.CONFLICT] ||
        HttpStatusMessages[HttpStatusCodes.UNPROCESSABLE_CONTENT],
      cause,
      data
    );
  }
}

const isValidationError = (candidate: any): candidate is ValidationError => {
  return (
    candidate instanceof ValidationError ||
    candidate?.code === HttpStatusCodes.CONFLICT ||
    candidate?.code === HttpStatusCodes.UNPROCESSABLE_CONTENT
  );
};

export { ValidationError, isValidationError };

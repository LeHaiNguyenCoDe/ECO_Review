import { HttpStatusCodes, HttpStatusMessages } from "@/constants/https/codes";
import { CustomError } from "./custom-err";

class ServiceError extends CustomError {
  constructor(cause?: string, data?: any) {
    super(
      HttpStatusCodes.INTERNAL_SERVICE_ERROR,
      HttpStatusMessages[HttpStatusCodes.INTERNAL_SERVICE_ERROR],
      cause,
      data
    );
  }
}

const isServiceError = (candidate: any): candidate is ServiceError => {
  return (
    candidate instanceof ServiceError ||
    candidate?.code === HttpStatusCodes.INTERNAL_SERVICE_ERROR
  );
};

export { ServiceError, isServiceError };

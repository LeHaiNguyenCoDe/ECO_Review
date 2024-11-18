class CustomError extends Error {
  code;
  data;
  constructor(code: number, message: string, cause?: string, data?: any) {
    super(message);

    this.name = code.toString();
    this.cause = cause;
    this.code = code;
    this.data = data;
  }
}

const isCustomError = (candidate: any): candidate is CustomError => {
  return candidate instanceof CustomError || "code" in candidate;
};

export { CustomError, isCustomError };

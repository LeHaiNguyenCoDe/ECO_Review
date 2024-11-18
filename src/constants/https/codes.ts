enum HttpStatusCodes {
  OK = 200,
  BAD_REQ = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_CONTENT = 422,
  INTERNAL_SERVICE_ERROR = 500,
}

const HttpStatusMessages: { [key in HttpStatusCodes]: string } = {
  [HttpStatusCodes.OK]: "Fetch data successfully!",
  [HttpStatusCodes.BAD_REQ]:
    "The server cannot or will not process the request due to something that is perceived to be a client error!",
  [HttpStatusCodes.UNAUTHORIZED]:
    "The client must authenticate itself to get the requested response!",
  [HttpStatusCodes.FORBIDDEN]:
    "The client does not have access rights to the content!",
  [HttpStatusCodes.NOT_FOUND]: "The server cannot find the requested resource!",
  [HttpStatusCodes.CONFLICT]:
    "This response is sent when a request conflicts with the current state of the server!",
  [HttpStatusCodes.UNPROCESSABLE_CONTENT]:
    "The request was well-formed but was unable to be followed due to semantic errors!",
  [HttpStatusCodes.INTERNAL_SERVICE_ERROR]:
    "The server has encountered a situation it does not know how to handle!",
};

export { HttpStatusCodes, HttpStatusMessages };

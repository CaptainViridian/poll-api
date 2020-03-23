export const internalServerError = (res, message) => sendResponse(500, message, res);

export const badRequest = (res, message) => sendResponse(400, message, res);

export const notFound = (res, message) => sendResponse(404, message, res);

export const notImplemented = (res, message) => sendResponse(501, message, res);

export const noContent = (res) => sendResponse(204, undefined, res);

export const unprocessableEntity = (res, message) => sendResponse(422, message, res);

export const unauthorized = (res) => sendResponse(401, undefined, res);

function sendResponse(statusCode, message, res) {
  res.statusCode = statusCode;
  res.end(message && JSON.stringify({ message }));
}

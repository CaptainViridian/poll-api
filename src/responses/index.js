export const internalServerError = (res, message) => sendResponse(500, message, res);

export const badRequest = (res, message) => sendResponse(400, message, res);

export const notFound = (res, message) => sendResponse(404, message, res);

function sendResponse(statusCode, message, res) {
  res.statusCode = statusCode;
  res.end(message && JSON.stringify({ message }));
}

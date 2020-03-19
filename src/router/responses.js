export function internalServerError(res) {
  res.statusCode = 500;
  res.end();
}

export function badRequest(res) {
  res.statusCode = 400;
  res.end();
}

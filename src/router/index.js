import { bodyParser } from '../utils';

import { badRequest, internalServerError } from '../responses';

export async function handleRequest(req, res) {
  const { url, method } = req;
  let body;
  try {
     body = await bodyParser(req);
  } catch (e) {
    if(e.name === 'SyntaxError')
      badRequest(res);
    else
      internalServerError(res);
    return;
  }

  res.end(JSON.stringify(body));
}

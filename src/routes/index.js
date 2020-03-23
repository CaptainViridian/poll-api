import body from './middleware/body';
import authorize from './middleware/authorize';

import { isMethodImplemented, testURLRegex } from '../utils';
import { notImplemented } from '../responses';

import createPollsRoutes from './pollRouter';
import createAuthRoutes from './authRouter';

import Router from './Router';

const router = new Router();

createPollsRoutes(router);
createAuthRoutes(router);

export async function handleRequest(req, res) {
  const { url, method } = req;

  res.setHeader('Content-Type', 'application/json');

  if(!isMethodImplemented(method)) {
    notImplemented(res);
    return;
  }

  try {
    const reqBody = await body(req, res);

    if(!testURLRegex('/authenticate', url))
      await authorize(req, res);

    router.matchReqURL({ url, method, body: reqBody }, res);
  } catch (err) {
    return;
  }
}

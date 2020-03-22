import { bodyParser, bodyRequired, isMethodImplemented } from '../utils';
import { badRequest, internalServerError, notImplemented } from '../responses';
import createPollsRoutes from './pollRouter';
import Router from './Router';

const router = new Router();
createPollsRoutes(router);

export async function handleRequest(req, res) {
  const { url, method } = req;

  res.setHeader('Content-Type', 'application/json');

  if(!isMethodImplemented(method)) {
    notImplemented(res);
    return;
  }

  let body;
  if(bodyRequired(method))
    try {
      body = await bodyParser(req);
    } catch (e) {
      if(e instanceof SyntaxError) {
        badRequest(res);
      }
      else
        internalServerError(res);
      return;
    }

  router.matchReqURL({ url, method, body }, res);
}

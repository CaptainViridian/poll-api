import { bodyParser, bodyRequired } from '../../utils';
import { badRequest, internalServerError } from '../../responses';

export default async (req, res) => {
  const { method } = req;
  if(bodyRequired(method))
    try {
      const body = await bodyParser(req);
      return body;
    } catch (err) {
      if(err instanceof SyntaxError) {
        badRequest(res);
      }
      else
        internalServerError(res);
      throw err;
    }
};

import { verifyJwt } from '../../utils';
import { unauthorized, internalServerError } from '../../responses';

export default async (req, res) => {
  const { headers } = req;
  const token = headers['x-access-token'];

  if(!token){
    unauthorized(res);
    throw new Error();
  }

  const { SECRET } = process.env;

  try {
    const decoded = await verifyJwt(token, SECRET);
    req.userId = decoded.id;
  } catch (err) {
    internalServerError(res, 'Authentication failed');
    throw err;
  }
};

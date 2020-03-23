import jwt from 'jsonwebtoken';

import * as authService from '../services/authService';
import { badRequest, internalServerError } from '../responses';
import { WrongBodyError } from '../error';

export async function authenticate(reqData, res) {
  const { body } = reqData;
  const { SECRET } = process.env;

  try {
    const id = await authService.authenticate(body);
    const token = await jwt.sign({ id }, SECRET);

    res.statusCode = 200;
    res.end(JSON.stringify({ auth: true, token }));
  } catch (err) {
    if(err instanceof WrongBodyError)
      badRequest(res);
    else
      internalServerError(res, process.env);
  }
}

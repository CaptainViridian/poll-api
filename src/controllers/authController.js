import jwt from 'jsonwebtoken';

import * as authService from '../services/authService';
import { badRequest, internalServerError } from '../responses';
import { WrongBodyError } from '../error';

/**
*  @api {post} /authenticate Authenticate a user
*  @apiName Authenticate
*  @apiGroup Authentication
*
*  @apiParam {String} user User's name
*  @apiParam {String} password User's password
*
*  @apiSuccess {Boolean} auth User's authentication status
*  @apiSuccess {String} token User's generated token
*  @apiSuccessExample Response
*     HTTP/1.1 200 OK
*     {
*         "auth": true,
*         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNzcwZGY1MWZiOGUwMTc2ZjJjYTc0NiIsImlhdCI6MTU4NTAyODA5MH0.n81vsmQzYASecq1jJupFmUnFcS0LOp7qtHopA7JvBNc"
*     }
*/
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

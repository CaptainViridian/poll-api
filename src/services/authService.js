import { WrongBodyError } from '../error';
import mock from '../../test/mock';

const { randomId } = mock();

export async function authenticate(body) {
  const { user, password } = body;

  if(!user || !password)
    throw new WrongBodyError();

  return randomId;
}

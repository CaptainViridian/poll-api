import { promisify } from 'util';
import jsonBody from 'body/json';

import { IMPLEMENTED_METHODS } from './constants';

export const bodyParser = promisify(jsonBody);

export const bodyRequired = method => method === 'POST';

export const testURLRegex = (regex, str) => new RegExp(`^${regex}/*$`).test(str)

export const isMethodImplemented = method => IMPLEMENTED_METHODS[method];

export const forEach = async (arr, cb) => {
  for (let i = 0; i < arr.length; i++)
    await cb(arr[i], i, arr);
};

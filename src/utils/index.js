import { promisify } from 'util';
import jsonBody from 'body/json';

export const bodyParser = promisify(jsonBody);

export const bodyRequired = method => method === 'POST';

export const testURLRegex = (regex, str) => new RegExp(`^${regex}/*$`).test(str)

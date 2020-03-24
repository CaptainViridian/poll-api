import { ENV } from '../utils/constants';

const {
  MONGO_PREFIX: prefix,
  DB_USER: user,
  DB_PASSWORD: password,
  DB_NAME: name,
  DB_HOST: host,
  DB_PORT: port,
  DB_CONNECTION_QUERY_STRING: connectionQueryString,
  ENV: env,
} = process.env;

export default {
  prefix: prefix || env === ENV.prod ? 'mongodb+srv' : 'mongodb',
  user,
  password,
  name: `${name}-${env}`,
  host,
  port,
  connectionQueryString: `${env !== ENV.prod && 'authSource=admin&'}${connectionQueryString && connectionQueryString}`,
};

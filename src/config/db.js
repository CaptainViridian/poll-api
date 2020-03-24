import { ENV_TYPES } from '../utils/constants';

const {
  MONGO_PREFIX: prefix,
  DB_USER: user,
  DB_PASSWORD: password,
  DB_NAME,
  DB_HOST: host,
  DB_PORT: port,
  DB_CONNECTION_QUERY_STRING: connectionQueryString,
  ENV,
} = process.env;

const env = ENV || ENV_TYPES.dev;
const name = DB_NAME || 'db';

export default {
  prefix: prefix || env === ENV_TYPES.prod ? 'mongodb+srv' : 'mongodb',
  user,
  password,
  name: `${name}-${env}`,
  host: host || 'db',
  port: port,
  connectionQueryString: `${env !== ENV_TYPES.prod ? 'authSource=admin&' : ''}${connectionQueryString ? connectionQueryString : ''}`,
};

const {
  DB_USER: user,
  DB_PASSWORD: password,
  DB_NAME: name,
  DB_HOST: host,
  DB_PORT: port,
  DB_AUTH_SOURCE: authSource,
} = process.env;

export default {
  user,
  password,
  name,
  host,
  port,
  authSource,
};

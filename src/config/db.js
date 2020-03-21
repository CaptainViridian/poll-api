const {
  DB_USER: user,
  DB_PASSWORD: password,
  DB_NAME: name,
  DB_HOST: host,
  DB_PORT: port,
  DB_AUTH_SOURCE: authSource,
  ENV: env,
} = process.env;

export default {
  user,
  password,
  name: `${name}-${env}`,
  host,
  port,
  authSource,
};

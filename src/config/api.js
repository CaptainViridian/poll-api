const { API_HOST: host, API_PORT: port } = process.env;

export default {
  host: host || '0.0.0.0',
  port: port || 9001,
};

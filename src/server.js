import { createServer } from 'http';
import { handleRequest } from './routes';

const server = createServer(handleRequest);

export async function startServer() {
  const { default: apiConfig } = await import('./config/api');

  const db = await import('./db');
  await db.connect();

  server
    .listen(apiConfig.port, apiConfig.host, () => {
      const { port, host } = apiConfig;
      console.log(`Server running at http://${host}:${port}/`);
    });
}

export default server;

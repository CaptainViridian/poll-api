import { handleRequest } from './routes';
import http from 'http';

const hostname = process.env.HOST_NAME || '0.0.0.0';
const port = process.env.API_PORT || 9001;

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  handleRequest(req, res);
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

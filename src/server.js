import http from 'node:http';
import { routes } from './routes/routes.js';

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const server = http.createServer(async (req, res) => {
  const { url, method } = req;
  const route = routes.find((route) => route.method == method && route.path == url);
  console.log(url, method);
  if (route) {
    return route.handler(req, res);
  }

  return res.writeHead(500).end();
});

server.listen(PORT, () => console.log(`listening on: ${BASE_URL}`));

import http from 'node:http';
import { routes } from './routes/routes.js';
import { jsonBuffer } from './middleware/jsonBuffer.js';

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  // middleware responsable to build req body
  await jsonBuffer(req, res);

  const route = routes.find((route) => route.method == method && route.path.test(url));

  if (route) {
    const routeParams = url.match(route.path);

    req.params = { ...routeParams.groups };

    return route.handler(req, res);
  }

  return res.writeHead(500).end();
});

server.listen(PORT, () => console.log(`listening on: ${BASE_URL}`));

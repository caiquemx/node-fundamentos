import http from 'node:http';

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const server = http.createServer(async (req, res) => {
  return res.end();
});

server.listen(PORT, () => console.log(`listening on: ${BASE_URL}`));

export async function jsonBuffer(req, res) {
  const bodyBuffer = [];

  for await (let chunk of req) {
    bodyBuffer.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(bodyBuffer).toString());
  } catch (error) {
    req.body = null;
  }

  res.setHeader('Content-Type', 'application/json');
}

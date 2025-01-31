import Database from '../database/Database.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/task',
    handler: async function (req, res) {
      // const { id } = req.params;
      const data = await database.select('tasks');
      return res.writeHead(200).end(JSON.stringify(data));
    },
  },
];

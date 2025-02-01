import Database from '../database/Database.js';
import { randomUUID } from 'node:crypto';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/task',
    handler: async function (req, res) {
      // const { id } = req.params;
      const data = await database.select('task');
      return res.writeHead(200).end(JSON.stringify(data));
    },
  },
  {
    method: 'POST',
    path: '/task',
    handler: async function (req, res) {
      const task = {
        id: randomUUID(),
        title: null,
        description: null,
        created_at: new Date(),
        update_at: new Date(),
        completed_at: null,
      };

      const data = { description: '', ...req.body };

      try {
        database.isValidPayload(data);
        database.insert('task', { ...task, ...data });
      } catch (error) {
        return res.writeHead(400).end(error.message);
      }

      return res.writeHead(201).end();
    },
  },
];

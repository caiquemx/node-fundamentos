import Database from '../database/Database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from '../utils/build-route-params.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/task'),
    handler: async function (req, res) {
      let title = '';
      let description = '';

      if (req.query) {
        title = req.query.title ?? '';
        description = req.query.description ?? '';
      }

      const tasks = await database.select('task');
      let data = tasks;

      if (title || description) {
        data = tasks.filter((task) =>
          title
            ? task.title.includes(title)
            : false || description
            ? task.description.includes(description)
            : false
        );
      }
      return res.writeHead(200).end(JSON.stringify(data));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/task'),
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

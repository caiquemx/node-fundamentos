import fs from 'node:fs/promises';
const databasePath = new URL('db.json', import.meta.url);

export default class Database {
  #base_path = databasePath;

  #database = {};

  constructor() {
    fs.readFile(this.#base_path)
      .then((data) => (this.#database = JSON.parse(data)))
      .catch(() => this.#persist());
  }

  insert(table, payload) {
    if (!this.#database[table]) {
      this.#database[table] = [];
    }

    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      throw Error('Invalid Request Data');
    }

    this.#isValidPayload(payload);

    this.#database[table].push(payload);

    this.#persist();
  }

  select(table, id = null) {
    if (!id) {
      return this.#database[table];
    }
    const data = this.#database[table].filter((data) => data.id == id);
    console.log({ data });

    if (data.length <= 0) {
      throw Error('Invalid Request ID');
    }
    return this.#database[table];
  }

  #isValidPayload(payload) {
    const requiredKeys = ['title', 'created_at'];
    const reqBodyKeys = Object.keys(payload);

    if (!Object.values(payload).every((value) => typeof value == 'string')) {
      throw Error('Invalid Request Values');
    }

    if (reqBodyKeys.length > 2) {
      throw Error('Invalid Request Body');
    }

    if (!requiredKeys.some((key) => reqBodyKeys.includes(key))) {
      throw Error('Invalid Request Body');
    }
  }

  #persist() {
    fs.writeFile(this.#base_path, JSON.stringify(this.#database));
  }
}

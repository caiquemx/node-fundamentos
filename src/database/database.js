import fs from 'node:fs/promises';
const DATABASE_PATH = new URL('db.json', import.meta.url);
const DEFAULT_ERROR_MESSAGE = 'Invalid Request Body';
const INVALID_PARAMETERS_ERROR_MESSAGE = 'Invalid Request Parameters';

export default class Database {
  #base_path = DATABASE_PATH;

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
      throw Error(DEFAULT_ERROR_MESSAGE);
    }

    this.#database[table].push(payload);
    this.#persist();
  }

  select(table, id = null) {
    if (!id) {
      return this.#database[table];
    }
    const data = this.#database[table].filter((data) => data.id == id);

    if (data.length <= 0) {
      throw Error(INVALID_PARAMETERS_ERROR_MESSAGE);
    }
    return this.#database[table];
  }

  update(table, id, payload) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      throw Error(DEFAULT_ERROR_MESSAGE);
    }

    const taskIndex = this.#database[table].findIndex((task) => task.id == id);

    if (taskIndex == -1) {
      throw Error(INVALID_PARAMETERS_ERROR_MESSAGE);
    }

    this.#database[table][taskIndex] = {
      ...this.#database[table][taskIndex],
      ...payload,
      updated_at: new Date(),
    };

    this.#persist();
  }

  delete(table, id) {
    const taskIndex = this.#database[table].findIndex((task) => task.id == id);

    if (taskIndex == -1) {
      throw Error(INVALID_PARAMETERS_ERROR_MESSAGE);
    }

    if (!id) {
      throw Error(INVALID_PARAMETERS_ERROR_MESSAGE);
    }

    this.#database[table].splice(taskIndex, 1);
    this.#persist();
  }

  isValidPayload(payload, method) {
    const requiredKeys = ['title', 'description'];
    const reqBodyKeys = Object.keys(payload);
    const reqBodyValues = Object.values(payload);

    if (method == 'POST') {
      if (reqBodyKeys.length > 2) {
        throw Error(DEFAULT_ERROR_MESSAGE);
      }
      if (!payload.title || payload.title.length <= 0) {
        throw Error(DEFAULT_ERROR_MESSAGE);
      }
    }

    if (!reqBodyValues.every((value) => typeof value == 'string')) {
      throw Error(DEFAULT_ERROR_MESSAGE);
    }

    if (reqBodyKeys.length <= 0) {
      throw Error(DEFAULT_ERROR_MESSAGE);
    }

    if (!reqBodyKeys.every((key) => requiredKeys.includes(key))) {
      throw Error(DEFAULT_ERROR_MESSAGE);
    }
  }

  #persist() {
    fs.writeFile(this.#base_path, JSON.stringify(this.#database));
  }
}

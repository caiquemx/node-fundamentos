# CRUD API with Vanilla Node.js

## Description

This project is a simple CRUD API built using only Node.js and its built-in libraries (Vanilla). The purpose of this project is to demonstrate how to build a RESTful API without any external dependencies. It was created during rocketseat node course.

## Features

- Create a new task
- Retrieve tasks (with optional filtering by title and description)
- Update a task
- Delete a task
- Mark a task as completed

## Technologies Used

- **Node.js** (no external libraries)

## Installation

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Steps

1. Clone this repository:
   ```sh
   git clone https://git@github.com:caiquemx/node-fundamentos.git
   ```
2. Navigate to the project directory:
   ```sh
   cd your-repo-name
   ```
3. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Get All Tasks

```http
GET /task
```

**Optional Query Parameters:**

- `title`: Filter tasks by title
- `description`: Filter tasks by description

**Example Request:**

```http
GET /task?title=Task
```

**Response:**

```json
[
  {
    "id": "uuid",
    "title": "Task 1",
    "description": "Description 1",
    "created_at": "2024-02-03T00:00:00Z",
    "update_at": "2024-02-03T00:00:00Z",
    "completed_at": null
  }
]
```

### Create a Task

```http
POST /task
```

**Request Body:**

```json
{
  "title": "New Task",
  "description": "Task description"
}
```

**Response:** `201 Created`

### Update a Task

```http
PUT /task/:id
```

**Request Body:**

```json
{
  "title": "Updated Task",
  "description": "Updated description"
}
```

**Response:** `204 No Content`

### Delete a Task

```http
DELETE /task/:id
```

**Response:** `204 No Content`

### Mark a Task as Completed

```http
PATCH /task/:id/complete
```

**Response:** `204 No Content`

## Project Structure

```
project-folder/
|── src/
  │── database/
  │   ├── Database.js
  │── middleware/
  │   ├── jsonBuffer.js
  │── routes/
  │   ├── routes.js
  │── utils/
  │   ├── build-query-params.js
  |   ├── build-route-params.js
  │── server.js
│── .gitignore
│── package.json
│── README.md
```

## Author

- **Caique Moreira** - [GitHub](https://github.com/caiquemx)

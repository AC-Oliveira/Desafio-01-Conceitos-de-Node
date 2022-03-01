/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const { checksExistsUserAccount, checkExistsToDo } = require('./middlewares/middlewares');
const {
  appendUserToDo, updateToDo,
  setToDoAsDone, taskDelete
} = require('./services/tasksServices');
const users = require('./db/dbmock');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/users', (_request, response) => {
  response.status(200).json(users);
});

app.post('/users', checksExistsUserAccount, (request, response) => {
  const user = request.body;

  user.todos = [];
  user.id = uuidv4();
  users.push(user);

  response.status(201).json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;
  const { todos } = users.find((user) => user.username === username);

  response.status(200).json(todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { headers: { username }, body: userToDo } = request;

  userToDo.done = false;
  userToDo.created_at = new Date().toISOString();
  userToDo.id = uuidv4();

  users.map((user) => appendUserToDo(user, username, userToDo));

  response.status(201).json(userToDo);
});

app.put('/todos/:id', checksExistsUserAccount, checkExistsToDo, (request, response) => {
  const { params: { id }, headers: { username }, body: todo } = request;

  todo.done = false;
  todo.created_at = new Date().toISOString();
  todo.id = id;

  let todoUpdated = { ...updateToDo(id, todo, username) };

  delete todoUpdated.created_at;
  delete todoUpdated.id;

  response.status(200).json(todoUpdated);
});

app.patch('/todos/:id/done', checksExistsUserAccount, checkExistsToDo, (request, response) => {
  const { headers: { username }, params: { id } } = request;
  const result = setToDoAsDone(username, id);

  response.status(200).json(result);
});

app.delete('/todos/:id', checksExistsUserAccount, checkExistsToDo, (request, response) => {
  const { params: { id }, headers: { username } } = request;
  taskDelete(username, id);

  response.status(204).json({ message: 'Deleted' });
});

module.exports = app;

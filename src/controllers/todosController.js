const {
  findUserToDos, appendUserToDo, updateToDo, setToDoAsDone, toDoDelete
} = require('../services/tasksServices');

const getAllToDosController = (request, response) => {
  const { username } = request.headers;
  const todos = findUserToDos(username);

  response.status(200).json(todos);
};

const addToDoToListController = (request, response) => {
  const { headers: { username }, body: userToDo } = request;
  const addedToDo = appendUserToDo(username, userToDo);

  response.status(201).json(addedToDo);
};

const updateToDoController = (request, response) => {
  const { params: { id }, headers: { username }, body: todo } = request;
  const todoUpdated = { ...updateToDo(id, todo, username) };

  response.status(200).json(todoUpdated);
};

const doneToDoController = (request, response) => {
  const { headers: { username }, params: { id } } = request;
  const result = setToDoAsDone(username, id);

  response.status(200).json(result);
};

const deleteToDoController = (request, response) => {
  const { params: { id }, headers: { username } } = request;
  toDoDelete(username, id);

  response.status(204).json({ message: 'To Do deleted' });
};

module.exports = {
  getAllToDosController,
  addToDoToListController,
  updateToDoController,
  doneToDoController,
  deleteToDoController
};

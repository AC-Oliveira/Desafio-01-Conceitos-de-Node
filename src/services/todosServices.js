const users = require('../db/dbmock');
const { v4: uuidv4 } = require('uuid');

const appendUserToDo = (username, todo) => {
  const modifiedToDo = {
    ...todo, done: false, created_at: new Date().toISOString(), id: uuidv4()
  };
  const userIndex = users.map((user) => user.username).indexOf(username);

  users[userIndex].todos.push(modifiedToDo);
  return modifiedToDo;
};

const findUserToDos = (username) => {
  const { todos } = users.find((user) => user.username === username);
  return todos;
};

const updateToDo = (id, newToDo, username) => {
  let updatedToDo = {};
  const userIndex = users.map((user) => user.username).indexOf(username);
  users[userIndex].todos = users[userIndex]
    .todos.map((todo) => {
      if (todo.id === id) {
        updatedToDo = { ...todo, ...newToDo };
        return updatedToDo;
      }
      return todo;
    });

  delete updateToDo.created_at;
  delete updateToDo.id;

  return updatedToDo;
};

const setToDoAsDone = (username, id) => {
  let doneToDo = {};
  const userIndex = users.map((user) => user.username).indexOf(username);
  users[userIndex].todos = users[userIndex].todos.map((todo) => {
    if (todo.id === id) {
      doneToDo = { ...todo, done: true };
      return doneToDo;
    }
    return todo;
  });
  return doneToDo;
};

const toDoDelete = (username, id) => {
  const userIndex = users.map((user) => user.username).indexOf(username);
  users[userIndex].todos = users[userIndex].todos.filter((todo) => todo.id !== id);
};

module.exports = {
  appendUserToDo,
  findUserToDos,
  updateToDo,
  setToDoAsDone,
  toDoDelete
};

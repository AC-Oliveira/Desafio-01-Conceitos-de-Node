const users = require('../db/dbmock');

const appendUserToDo = (user, username, todo) => {
  if (user.username === username) user.todos.push(todo);
};

const updateToDo = (id, todo, username) => {
  let index;
  const { todos } = users.find((user, indexOfUser) => {
    if (user.username === username) {
      user.todos.forEach((userToDo, indexOfToDo) => {
        if (userToDo.id === id) {
          index = indexOfToDo;
          users[indexOfUser].todos = [
            ...user.todos.slice(0, indexOfToDo), todo, ...user.todos.slice(indexOfToDo + 1)];
        }
      });
    }
    return user.username === username;
  });

  return todos[index];
};

const setToDoAsDone = (username, id) => {
  let index;
  const { todos } = users.find((user, indexOfUser) => {
    if (user.username === username) {
      user.todos.forEach((todo, indexOfToDo) => {
        index = indexOfToDo;
        if (todo.id === id) users[indexOfUser].todos[indexOfToDo].done = true;
      });
    }
    return user.username === username;
  });

  return todos[index];
};

const taskDelete = (username, id) => {
  users.forEach((user, indexOfUser) => {
    if (user.username === username) {
      user.todos.forEach((todo, indexOfToDo) => {
        if (todo.id === id) {
          users[indexOfUser].todos = [
            ...users[indexOfUser].todos.slice(0, indexOfToDo),
            ...users[indexOfUser].todos.slice(indexOfToDo + 1)
          ];
        }
      });
    }
  });
};

module.exports = {
  appendUserToDo,
  updateToDo,
  setToDoAsDone,
  taskDelete
};

const users = require('../db/dbmock');
const { v4: uuidv4 } = require('uuid');

const addUser = (user) => {
  const userToAdd = {
    ...user, todos: [], id: uuidv4(), done: false
  };
  users.push(userToAdd);
  return userToAdd;
};

module.exports = { addUser };

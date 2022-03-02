const { addUser } = require('../services/usersServices');
const users = require('../db/dbmock');

const getAllUsers = (_request, response) => {
  response.status(200).json(users);
};

const addNewUser = (request, response) => {
  const user = request.body;
  const addedUser = addUser(user);

  response.status(201).json(addedUser);
};

module.exports = { getAllUsers, addNewUser };

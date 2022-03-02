const users = require('../db/dbmock');

function checksExistsUserAccount(request, response, next) {
  const {
    body: { username: bodyUsername },
    originalUrl, headers: { username: headersUsername }
  } = request;
  const username = bodyUsername || headersUsername;
  const userExists = users.some((user) => user.username === username);

  if (userExists && originalUrl === '/users') return response.status(400).json({ error: 'User already exists!' });
  if (!userExists && originalUrl.includes('/todos')) return response.status(404).json({ error: 'User not found!' });

  return next();
}

const checkExistsToDo = (request, response, next) =>{
  const { headers: { username }, params } = request;
  const { todos } = users.find((user) => user.username === username);
  const existsToDo = todos.some((toDo) => toDo.id === params.id);

  if (!existsToDo) return response.status(404).json({ error: 'ToDo not found!' });
  return next();
};

module.exports = { checksExistsUserAccount, checkExistsToDo };

const express = require('express');
const cors = require('cors');

const usersRoute = require('./routes/usersRoute');
const todosRoute = require('./routes/todosRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', usersRoute);
app.use('/todos', todosRoute);

module.exports = app;

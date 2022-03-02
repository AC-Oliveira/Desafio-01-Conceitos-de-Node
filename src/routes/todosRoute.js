const express = require('express');
const {
  getAllToDosController,
  addToDoToListController,
  updateToDoController,
  doneToDoController,
  deleteToDoController
} = require('../controllers/todosController');
const { checksExistsUserAccount, checkExistsToDo } = require('../middlewares/middlewares');

const router = express.Router();

router.get('/', checksExistsUserAccount, getAllToDosController);

router.post('/', checksExistsUserAccount, addToDoToListController);

router.put('/:id', checksExistsUserAccount, checkExistsToDo, updateToDoController);

router.patch('/:id/done', checksExistsUserAccount, checkExistsToDo, doneToDoController);

router.delete('/:id', checksExistsUserAccount, checkExistsToDo, deleteToDoController);

module.exports = router;

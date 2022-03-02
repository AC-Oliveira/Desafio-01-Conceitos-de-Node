const express = require('express');
const {
  getAllToDos, addToDoToList, updateToDoController, doneToDoController, deleteToDoController
} = require('../controllers/todosController');
const { checksExistsUserAccount, checkExistsToDo } = require('../middlewares/middlewares');

const router = express.Router();

router.get('/', checksExistsUserAccount, getAllToDos);

router.post('/', checksExistsUserAccount, addToDoToList);

router.put('/:id', checksExistsUserAccount, checkExistsToDo, updateToDoController);

router.patch('/:id/done', checksExistsUserAccount, checkExistsToDo, doneToDoController);

router.delete('/:id', checksExistsUserAccount, checkExistsToDo, deleteToDoController);

module.exports = router;

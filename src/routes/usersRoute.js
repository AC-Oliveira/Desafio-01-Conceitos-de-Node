const express = require('express');
const { getAllUsers, addNewUser } = require('../controllers/usersController');
const { checksExistsUserAccount } = require('../middlewares/middlewares');
const router = express.Router();

router.get('/', checksExistsUserAccount, getAllUsers);
router.post('/', checksExistsUserAccount, addNewUser);

module.exports = router;

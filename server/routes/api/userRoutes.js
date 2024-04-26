const router = require('express').Router();
const {
getAllUsers, getSingleUser, createUser, updateUser, deleteUser, addShiftPosted, addShiftTaken, removeShiftTaken, removeShiftPosted, userCount
} = require('../../controllers/userController');

// /api/user
router.route('/').get((req, res) => getAllUsers(req, res)).post((req, res) => createUser(req, res));

// /api/user/count
router.route('/count').get((req, res) => userCount(req, res));

// update a user
router.route('/:userId').put((req, res) => updateUser(req, res));

// /api/user/:userId
router.route('/:userId').get((req, res) => getSingleUser(req, res)).delete((req, res) => deleteUser(req, res));

module.exports = router;

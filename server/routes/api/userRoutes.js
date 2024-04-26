const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addShiftPosted,
  addShiftTaken,
  removeShiftTaken,
  removeShiftPosted,
  userCount
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getAllUsers).post(createUser);

// /api/user/count
router.route('/count').get(userCount);

// update a user
router.route('/:userId').put(updateUser);

// /api/user/:userId
router.route('/:userId')
  .get(getSingleUser)
  .delete(deleteUser);

// /api/user/:userId/shifts/posted
router.route('/:userId/shifts/posted')
  .post(addShiftPosted)
  .delete(removeShiftPosted);

// /api/user/:userId/shifts/taken
router.route('/:userId/shifts/taken')
  .post(addShiftTaken)
  .delete(removeShiftTaken);

module.exports = router;

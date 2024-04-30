const router = require('express').Router();
const {
  getShifts,
  getSingleShift,
  createShift,
  deleteShift,
  updateShift,
} = require('../../controllers/shiftController.js');

// /api/shifts
router.route('/').get((req, res) => getShifts(req, res)).post((req, res) => createShift(req, res));

// /api/shifts/:shiftId
router
  .route('/:shiftId')
  .get((req, res) => getSingleShift(req, res))
  .put((req, res) => updateShift(req, res))
  .delete((req, res) => deleteShift(req, res));


module.exports = router;

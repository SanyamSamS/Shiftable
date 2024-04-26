const { Shift, User } = require('../models');

// get all the shifts
async function getShifts(req, res) {
  try {
    const shifts = await Shift.find().populate('currentHolder');
    res.json(shifts);
  } catch (err) {
    res.status(500).json(err);
  }
}

// get a single shift by id
async function getSingleShift(req, res) {
  try {
    const shift = await Shift.findById(req.params.shiftId).populate('currentHolder');

    if (!shift) {
      return res.status(404).json({ message: 'No shift with that ID' });
    }

    res.json(shift);
  } catch (err) {
    res.status(500).json(err);
  }
}

// create a new shift
async function createShift(req, res) {
  try {
    const { shiftText, userId } = req.body; 
    const newShift = await Shift.create({ shiftText, currentHolder: userId });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.shifts.push(newShift._id);
    await user.save(); 
    res.json(newShift);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// shift be gone
async function deleteShift(req, res) {
  try {
    const shiftToDelete = await Shift.findById(req.params.shiftId);
    if (!shiftToDelete) {
      return res.status(404).json({ message: 'No shift with that ID' });
    }
    const userIds = shiftToDelete.currentHolder;
    await Shift.findByIdAndDelete(req.params.shiftId);
    if (userIds) {
      await User.findByIdAndUpdate(userIds, { $pull: { shifts: req.params.shiftId } });
    }
    res.json({ message: 'Shift and associated user successfully deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
}

// update a shift
async function updateShift(req, res) {
  try {
    const updatedShift = await Shift.findByIdAndUpdate(req.params.shiftId, req.body, { new: true });
    if (!updatedShift) {
      return res.status(404).json({ message: 'No shift with this id!' });
    }
    res.json(updatedShift);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getShifts,
  getSingleShift,
  createShift,
  deleteShift,
  updateShift,
};

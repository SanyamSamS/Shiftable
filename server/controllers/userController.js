const { User } = require('../models');

// get the number of users overall
const userCount = async () => {
  try {
    const result = await User.aggregate([{ $count: "userCount" }]);
    return result[0] ? result[0].userCount : 0;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

// get all the users
const getAllUsers = async (req, res) => {
  try {
     const users = await User.find().populate('shiftsPosted').populate('shiftsTaken');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

//check if user information already exists in database on signup
const checkAvailability = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const usernameExists = await User.findOne({ username });
        const emailExists = await User.findOne({ email });
        const passwordExists = await User.findOne({ password })

        res.json({
            usernameTaken: !!usernameExists,
            emailTaken: !!emailExists,
            passwordTaken: !!passwordExists
        });
    } catch (error) {
        res.status(500).json({ message: "Server error while checking availability" });
    }
};

// get a single user by their id
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('shiftsPosted')
      .populate('shiftsTaken');
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// create a new user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// updates a user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// delete a user 
const deleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'No such user exists!' });
    }

    // delete the user
    await userToDelete.remove();

    // may need to perform additional cleanup for associated shifts
    // may want to mark shifts as unassigned or similar

    res.json({ message: 'User successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// update shifts posted by a user
const addShiftPosted = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { shiftsPosted: req.body.shiftId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID :(' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// update shifts taken
const addShiftTaken = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { shiftsTaken: req.body.shiftId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID :(' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// remove a shift taken from a user
const removeShiftTaken = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { shiftsTaken: req.body.shiftId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID :(' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// remove a shift posted by a user
const removeShiftPosted = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { shiftsPosted: req.body.shiftId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID :(' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser, addShiftPosted, addShiftTaken, removeShiftTaken, removeShiftPosted, userCount, checkAvailability };
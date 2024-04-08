const router = require('express').Router();
const userRoutes = require('./userRoutes'); 
const shiftsRoutes = require('./shiftsRoutes'); 

//comment back in if ShiftRequest is utilized
// const shiftRequestRoutes = require('./shiftRequestRoutes');

router.use('/user', userRoutes);

router.use('/shifts', shiftsRoutes);

// router.use('/shiftRequest', shiftRequestRoutes);

module.exports = router;

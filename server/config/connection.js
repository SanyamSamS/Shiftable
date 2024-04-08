const mongoose = require('mongoose');
// comment in to run locally & out on deploy
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Shiftable');

module.exports = mongoose.connection;

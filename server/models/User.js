const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 50,
  },
  // phone: {
  //   type: String,
  //   required: false, //set to false until signup is set to require
  //   unique: true,
  //   match: [/^(\d{3}[-.]\d{3}[-.]\d{4})|(\d{10})$/, 'Must match a phone number!'],
  // },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  // role: { //optional, set to false until signup utilizes 
  //   type: String,
  //   required: false,
  // },
  shiftsPosted: [{
    type: Schema.Types.ObjectId,
    ref: 'Shifts', 
  }],
  shiftsTaken: [{
    type: Schema.Types.ObjectId,
    ref: 'Shifts', 
  }],
}, {
  toJSON: {
    virtuals: true, 
  },
});

const User = model('User', userSchema);

module.exports = User;

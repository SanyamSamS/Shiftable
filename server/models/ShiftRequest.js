// const { Schema, model } = require('mongoose');

// const shiftRequestSchema = new Schema({
//     shift: {
//         type: Schema.Types.ObjectId, ref: 'Shift', required: true
//     },
//     requestedBy: {
//         type: Schema.Types.ObjectId, ref: 'User', required: true
//     },
//     respondBy: {
//         type: Schema.Types.ObjectId, ref: 'User'
//     },
//     status: {
//         type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending'
//     },
//     requestedAt: {
//         type: Date, default: Date.now
//     },
// }, {
//     toJSON: { virtuals: true },
// });

// module.exports = model('ShiftRequest', shiftRequestSchema);

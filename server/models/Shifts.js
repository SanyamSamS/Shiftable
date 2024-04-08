const { Schema, model } = require('mongoose');

const shiftsSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    timeStart: {
        type: Date,
        required: true
    },
    timeEnd: {
    type: Date,
    required: true,
    validate: {
        validator: function(value) {
        return this.timeStart < value;
        },
        message: 'Cant end before it starts!'
    }
    },
    location: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    status: {

        type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending'

    },
    currentHolder: {

        type: Schema.Types.ObjectId, ref: 'User'

    }, //apparently embedding is better than referencing for this minor data set unless shiftRequest becomes more complex
    shiftRequests: [{
        requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        requestedAt: { type: Date, default: Date.now },
          status: {
            type: String,
            enum: ['pending', 'accepted', 'declined'],
            default: 'pending'
    },
    }]
}, {
    toJSON: { virtuals: true },
});

module.exports = model('Shifts', shiftsSchema);

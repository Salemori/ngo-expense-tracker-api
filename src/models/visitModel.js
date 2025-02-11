const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
 
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    purpose: {
        type: String,
        required: true,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }],
    itemsDonated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
      orphanageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orphanage',
        required: true
    },
    // attendees: [{
    //      // I will have a reference to the user model here
    // }],
}, { timestamps: true });

const VisitModel =mongoose.model("Visit", visitSchema);
module.exports = VisitModel;

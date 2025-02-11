const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    amount:{
        type: Number,
        required: true,
        min: 0
    },
    description:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    category:{
        type: String,
        enum: ["Food", "Education", "Medical", "Infrastructure", "Rent", "Utility", "Monetary"],
        required: true
    },
    dateSpent:{
        type: Date,
        required: true,
        default : Date.now
    },
    recieptUrl:{
        type: String
    },
    orphanageId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orphanage",
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    } 
},
{timestamps: true}

);

const ExpenseModel = mongoose.model("Expense", expenseSchema);
module.exports = ExpenseModel;
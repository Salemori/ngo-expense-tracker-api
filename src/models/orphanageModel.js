const mongoose = require("mongoose");

const orphanageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      immutable: true
    },
    contact: {
      phone: {
        type: String,
        required: true,
        match: /^\+?[1-9]\d{1,14}$/
      },
      email: {
        type: String,
        lowercase: true,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      },
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      required: true,
      immutable: true
    },
    // updatedBy: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // }],
    // expenses: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Expense"
    // }],
    totalExpense: {
      type: Number,
      default: 0,
    },
    timesDonataed: {
      type: Number,
      default: 0,
    },
    // lastDonation:{
    //   type: Date,

    // },
    isActive: {
        type: Boolean,
        default: true
    },
  },
  { timestamps: true } // Will modifiedAt and createdAt be neccessary with this here?
);

const OrphanageModel = mongoose.model("Orphanage", orphanageSchema);
module.exports = OrphanageModel;

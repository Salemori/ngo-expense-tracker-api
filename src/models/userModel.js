const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        immutable: true
    },
    lastName: {
        type: String,
        required: true,
        immutable: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type: String,
        required: true,
        // match: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^\+?[1-9]\d{1,14}$/
    },
    isActive: {
        type: String,
        default: true
    }
},
{timestamps: true}
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel
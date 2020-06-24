const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    userName: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        required: true
    }
}, {timestamps: true});
const User = module.exports = mongoose.model("User", UserSchema);

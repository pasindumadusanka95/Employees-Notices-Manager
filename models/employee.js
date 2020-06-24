const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: false
    }
});
const Employee = module.exports = mongoose.model("Employee", employeeSchema);

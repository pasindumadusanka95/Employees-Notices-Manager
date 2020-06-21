const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    age:{
        type:Number,
        required : true
    },
    address:{
        type: String,
        required : true
    },
    profilePic:{
        type : String,
        required : false
    }
});
const Employee = module.exports = mongoose.model("Employee", employeeSchema);

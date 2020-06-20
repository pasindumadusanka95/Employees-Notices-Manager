const mongoose = require('mongoose');

const NoticeSchema = mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    description:{
        type:String,
        required : true
    },
     image : {
        type: String,
         required : true
     }
});
const Notice = module.exports = mongoose.model("Notice", NoticeSchema);

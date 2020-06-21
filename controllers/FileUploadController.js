const express = require('express');
const  router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req,file,callBack)=>{
        callBack(null, 'uploads')
    },
    filename: (req,file,callBack) => {
        callBack(null,'')
    }
});

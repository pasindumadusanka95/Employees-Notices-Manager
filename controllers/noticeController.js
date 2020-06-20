const express = require('express');
const  router = express.Router();

const notice = require('../models/notices');


//retrieving notice
router.get('/notices/get',(req,res,next)=>{
   notice.find(function (err, notices) {
            res.json(notices);
   })
});

//add notice
router.post('/notice/add',(req,res,next)=>{
    let newNotice = new notice({
        title : req.body.title,
        description : req.body.description,
        image : req.body.image
    });

    newNotice.save((err,notice)=>{
        if(err){
            res.json({msg : 'Failed to add notice' });
        }
        else{
            res.json({ msg : 'Notice added Successfully'});
        }
    });
});

//delete notice
router.delete('/notice/delete/:id',(req,res,next)=>{
    notice.deleteOne({_id : req.params.id}, function (err, result) {
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

module.exports =router;

const express = require('express');
const  router = express.Router();

const Notice = require('../models/notices');


//retrieving notice
router.get('/notices',(req,res,next)=>{
   Notice.find(function (err, notices) {
            res.json(notices);
   })
});

//add notice
router.post('/notice',(req,res,next)=>{
    let newNotice = new Notice({
        title : req.body.title,
        description : req.body.description
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
router.delete('/notice/:id',(req,res,next)=>{
    Notice.deleteOne({_id : req.params.id}, function (err, result) {
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

module.exports =router;

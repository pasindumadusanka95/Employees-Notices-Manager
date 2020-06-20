const express = require('express');
const  router = express.Router();

const employee = require('../models/employee');


//retrieving employees
router.get('/employees/get',(req,res,next)=>{
    employee.find(function (err, employees) {
        res.json(employees);
    })
});

//add employee
router.post('/employee/add',(req,res,next)=>{
    let newNotice = new employee({
        name : req.body.name,
        age : req.body.age,
        address : req.body.address,
        profilePic : req.body.profilePic
    });

    newNotice.save((err,employee)=>{
        if(err){
            res.json({msg : 'Failed to add emplyee' });
        }
        else{
            res.json({ msg : 'employee added Successfully'});
        }
    });
});

//delete employee
router.delete('/employee/delete/:id',(req,res,next)=>{
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

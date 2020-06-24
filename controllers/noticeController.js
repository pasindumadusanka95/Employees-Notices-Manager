const express = require('express');
const multer = require('multer');
const notice = require('../models/notices');
const router = express.Router();

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('image');


//retrieving notice list
router.get('/notices/get', (req, res, next) => {
    notice.find(function (err, notices) {
        res.json(notices);
    })
});

//retrieving notice by id
router.get('/notices/getById/:id', (req, res, next) => {
    notice.findById({_id: req.params.id}, function (err, notices) {
        res.json(notices);
    })
});

//add notice
router.post('/notice/add', upload, (req, res, next) => {
    let newNotice = new notice({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    });

    newNotice.save((err, notice) => {
        if (err) {
            res.json({msg: 'Failed to add notice'});
        } else {
            res.json({msg: 'Notice added Successfully'});
            let socketio = req.app.get('socketio');
            socketio.sockets.emit('notice.created', newNotice);
        }
    });
});

//update notice
router.put('/notice/update/:id', upload, (req, res, next) => {
    let newNotice = new notice({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    });

    notice.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, (err, notice) => {
        if (err) {
            res.json({msg: 'Failed to update notice'});
        } else {
            res.json({msg: 'Notice updated Successfully'});
        }
    });
});

//delete notice
router.delete('/notice/delete/:id', (req, res, next) => {
    notice.deleteOne({_id: req.params.id}, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;

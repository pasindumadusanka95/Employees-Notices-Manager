//importing modules
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./_helpers/error-handler');
const multer = require('multer');
// const jwt = require('./_helpers/jwt');

var app =express();

const notice = require('./controllers/noticeController');
const employee = require('./controllers/employeeController');
const users = require('./users/users.controller');

//connect mongoDb
mongoose.connect('mongodb://pasindu2:pasindu2@cluster0-shard-00-00-elbkn.mongodb.net:27017,cluster0-shard-00-01-elbkn.mongodb.net:27017,cluster0-shard-00-02-elbkn.mongodb.net:27017/noticedb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    {useNewUrlParser:true, useUnifiedTopology:true});

//on connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database');
});
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Error in Database Connection '+err);
    }
});

const port = 3000;

//adding middleware
app.use(cors());

//body-parser
app.use(bodyParser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));


// Attach Socket.io
var server = http.createServer(app);
var io = socketio.listen(server);
app.set('socketio', io);
app.set('server', server);

//routes
app.use('/api', notice);
app.use('/api', employee);
app.use('/users', require('./users/users.controller'));

// app.use(jwt());
app.use(errorHandler);

//testing
// app.get('/',(req,res) =>{
//     res.send('testing');
// });


// File upload settings
const PATH = './public/uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

let upload = multer({
    storage: storage
});

app.get('/api', function (req, res) {
    res.end('File catcher');
});

// POST File
app.post('/api/upload', upload.single('image'), function (req, res) {
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });

    } else {
        console.log('File is available!');
        return res.send({
            success: true
        })
    }
});


// app.get('server').listen(port,()=>{
//     console.log('Server started at port: '+port);
// });
app.listen(port,()=>{
    console.log('Server started at port: '+port);
});

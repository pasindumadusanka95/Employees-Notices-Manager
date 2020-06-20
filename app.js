//importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

var app =express();

const route = require('./routes/route');

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

//routes
app.use('/api', route);

//testing
app.get('/',(req,res) =>{
    res.send('testing');
});
app.listen(port,()=>{
    console.log('Server started at port: '+port);
});

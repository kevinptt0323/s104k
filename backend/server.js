'use strict';
const jwt = require('jsonwebtoken');
const express = require('express');

const helmet = require('helmet');
const multer = require('multer');
const bodyParser = require('body-parser');
let upload  = multer();
let app = express();
let server = require('http').createServer(app);
let port = process.env.PORT || 8787;

let Channel = require('./Channel.js');
Channel(server);

let User = require('./User');
let user = new User();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', (req, res)=>{
    res.send("RR");
});

app.post('/register', upload.array(), (req, res)=>{
    user.Register(req.body, (err, result)=>{
        if(err) {
            res.send(err);
        }
        res.send(result);
    });      
});

app.post('/login', upload.array(), (req, res)=>{
    user.Login(req.body, (err, result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    });      
});

app.post('/rate', upload.array(), (req, res)=>{
    user.Rate(req.body.id, req.body.score, (err, result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    });
});

server.listen(port, ()=>{
    console.log('Server listening on %d', port);
});

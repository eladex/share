var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');

var port = process.env.PORT || 3000;

mongoose.connect(config.getDbConnectionString(), function(err){
    if(err){
        //error handle
    }
});

app.listen(port);
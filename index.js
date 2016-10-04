var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var fileController = require('./controllers/fileController');


var port = process.env.PORT || 3000;




mongoose.connect(config.getDbConnectionString());
setupController(app);
fileController(app);

app.listen(port);

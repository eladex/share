var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var bodyParser = require('body-parser');

var setupController = require('./controllers/setupController');
var fileController = require('./controllers/fileController');
var novaController = require('./controllers/novaController');


var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));

mongoose.connect(config.getDbConnectionString());
setupController(app);
fileController(app);
novaController(app);

app.listen(port);

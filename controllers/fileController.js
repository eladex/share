var Files = require('../models/fileModel');
// var _ = require('underscore');
var bodyParser = require('body-parser');
var cors = require('./cors.js');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: '/home/eladex/Desktop/tmp/',
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }

});
var upload = multer({storage: storage}).any();

module.exports = function(app){
	app.use(cors());	
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/file/metadata/:id', function(req, res){
        Files.findById({ _id: req.params.id }, function(err, file){
            if (err) throw err;

            var normalizedFile = file.normalize();
            res.send(normalizedFile);
        })
    });

    app.post('/api/file/upload', function(req,res){
        upload(req, res, function(err){
            if(err){
                console.log(err);
                return res.status(500).end();
            }
            console.log(req.body);
            res.status(200).end();
        });   
    });
}

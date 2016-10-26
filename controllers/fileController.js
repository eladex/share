var Files = require('../models/fileModel');
// var _ = require('underscore');
var cors = require('./cors.js');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: 'C:/files',
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }

});
var upload = multer({storage: storage}).any();

module.exports = function(app){
	app.use(cors());	

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
            console.log(JSON.stringify(req.body));
            res.status(200).end();
        });   
    });
}

var Files = require('../models/fileModel');
// var _ = require('underscore');
var shortid = require('shortid');
var cors = require('./cors.js');
var config = require('../config');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: config.storageLocation,
    filename: function(req, file, cb){
        cb(null, shortid.generate() + '_' + file.originalname);
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
            var additionalData = JSON.parse(req.body.moreData);

            //multi files
            // var files = [];
            // req.files.forEach(function(file){
            //     files.push({
            //         name: file.originalname,
            //         type: file.mimetype,
            //         path: file.path,
            //         modifyDate: additionalData.lastModified,
            //         tags: additionalData.tags,
            //         size: file.size,
            //     });
            // });
            // Files.collection.insert(files,function(err, docs){
            //     if (err){
            //         console.log(err);
            //     }
            //     else {
            //         console.log(additionalData.lastModified);
            //         console.log("saved");
            //         res.status(200).end();
            //     }
            // });

            //single file
            Files.create({
                name: req.files[0].originalname,
                type: req.files[0].mimetype,
                path: req.files[0].path,
                modifyDate: additionalData.lastModified,
                tags: additionalData.tags,
                size: req.files[0].size,
            },function(err, doc){
                if (err){
                    console.log(err);
                }
                else {
                    console.log("saved");
                    res.status(200).end();
                }
            });

        });   
    });

    app.get('/api/file/download/:id', function(req, res){
        Files.findById({ _id: req.params.id }, function(err, file){
            if (err) throw err;
            var opts = {
                headers: {
                    'Content-Disposition': 'attachment; filename="' + file.name + '"'
                }
            };
            res.sendFile(file.path, opts);
        })
    });
}

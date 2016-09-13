var Files = require('../models/fileModel');
// var _ = require('underscore');
var bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/file/metadata/:id', function(req, res){
        Files.findById({ _id: req.params.id }, function(err, file){
            if (err) throw err;

            var normalizedFile = file.normalize();
            res.send(normalizedFile);
        })
    })
}
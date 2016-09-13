var Files = require('../models/fileModel');

module.exports = function(app){

    app.get('/api/setup', function(req, res){
        var startFiles = [{
                name: "file1",
                uploadDate:  new Date(),
                modifyDate:  new Date(),
                tags: ['gal','rotem'],
                type: 'pdf',
                size: 12,
                owner: 'gal',
                path: '/etc/init'
        },
        {
                name: "file2",
                uploadDate:  new Date(),
                modifyDate:  new Date(),
                tags: ['noy','green'],
                type: 'doc',
                size: 11,
                owner: 'noy',
                path: '/etc/init'
        },
        {
                name: "file3",
                uploadDate:  new Date(),
                modifyDate:  new Date(),
                tags: ['tal','nahari'],
                type: 'ppt',
                size: 11,
                owner: 'tal',
                path: '/etc/init'
        }];

        Files.create(startFiles, function(err, results){
            res.send(results);
        })
    })
}
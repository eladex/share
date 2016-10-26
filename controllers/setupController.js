var Files = require('../models/fileModel');
var Sources = require('../models/Nova/sourceModel');
var PublishProcedure = require('../models/Nova/publishProcedureModel');

module.exports = function (app) {

    app.get('/api/setup', function (req, res) {
        var startFiles = [{
            name: "file1",
            uploadDate: new Date(),
            modifyDate: new Date(),
            tags: ['gal', 'rotem'],
            type: 'pdf',
            size: 12,
            owner: 'gal',
            path: '/etc/init'
        },
        {
            name: "file2",
            uploadDate: new Date(),
            modifyDate: new Date(),
            tags: ['noy', 'green'],
            type: 'doc',
            size: 11,
            owner: 'noy',
            path: '/etc/init'
        },
        {
            name: "file3",
            uploadDate: new Date(),
            modifyDate: new Date(),
            tags: ['tal', 'nahari'],
            type: 'ppt',
            size: 11,
            owner: 'tal',
            path: '/etc/init'
        }];

        Files.create(startFiles, function (err, results) {
            res.send(results);
        })
    });

    app.get('/api/setup/Nova', function (req, res) {
        var startSources = [{
            Id: 1234556,
            Name: 'ולנטינו',
            Classification: 10,
            LinkedTriangleId: 728951,
            Clearance: 1,
            IsFlexible: false
        },
        {
            Id: 7532589,
            Name: 'אבן גבירול',
            Classification: 10,
            LinkedTriangleId: 711151,
            Clearance: 2,
            IsFlexible: false
        },
        {
            Id: 3698521,
            Name: 'סטודיו',
            Classification: 10,
            LinkedTriangleId: 72341,
            Clearance: 4,
            IsFlexible: false
        },
        {
            Id: 7412589,
            Name: 'רגילים',
            Classification: 10,
            LinkedTriangleId: 728951,
            Clearance: 3,
            IsFlexible: false
        },
        {
            Id: 1122334,
            Name: 'מגניב',
            Classification: 10,
            LinkedTriangleId: 728951,
            Clearance: 1,
            IsFlexible: false
        },
        {
            Id: 1596355,
            Name: 'מגזימים',
            Classification: 10,
            LinkedTriangleId: 728221,
            Clearance: 3,
            IsFlexible: false
        }];
        var startPublishProcedure = [
            {
                Id: 89801,
                Name: 'Sylvester',
                Type: 'נוהל הפצה',
                IsActive: true
            },
            {
                Id: 15099,
                Name: 'Ella',
                Type: 'שוס',
                IsActive: true
            },
            {
                Id: 10965,
                Name: 'Phelan',
                Type: 'נוהל הפצה',
                IsActive: true
            },
            {
                Id: 03171,
                Name: 'Gloria',
                Type: 'נוהל הפצה',
                IsActive: true
            },
            {
                Id: 63990,
                Name: 'Hasad',
                Type: 'נוהל הפצה',
                IsActive: true
            },
            {
                Id: 37296,
                Name: 'Igor',
                Type: 'שוס',
                IsActive: true
            },
            {
                Id: 49026,
                Name: 'Ahmed',
                Type: 'נוהל הפצה',
                IsActive: true
            },
            {
                Id: 41758,
                Name: 'Yeo',
                Type: 'שוס',
                IsActive: true
            }
        ];


        Sources.create(startSources, function (err, results) {
        });
        PublishProcedure.create(startPublishProcedure, function (err, results) {
        });
    });
}
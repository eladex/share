var Sources = require('../models/Nova/sourceModel');
var PublishProcedure = require('../models/Nova/publishProcedureModel');

module.exports = function (app) {
    app.get('/api/nova/autocomplete/source/:source', function (req, res) {
        Sources.find(
            { "Name": { "$regex": req.params.source, "$options": "i" } },
            function (err, sources) {
                if (err) throw err;

                res.send(sources);
            }
        );
    });

    app.get('/api/nova/autocomplete/publishProcedure/:publishProcedure', function (req, res) {
        PublishProcedure.find(
            { "Name": { "$regex": req.params.publishProcedure, "$options": "i" }, "Type": "נוהל הפצה" },
            function (err, publishProcedure) {
                if (err) throw err;

                res.send(publishProcedure);
            }
        );
    });

    app.get('/api/nova/autocomplete/shoss/:shoss', function (req, res) {
        PublishProcedure.find(
            { "Name": { "$regex": req.params.shoss, "$options": "i" }, "Type": "שוס" },
            function (err, shoss) {
                if (err) throw err;

                res.send(shoss);
            }
        );
    });

}

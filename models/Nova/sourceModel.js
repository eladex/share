var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sourceSchema = new Schema({
    Id: Number,
    Name: String,
    Classification: Number,
    LinkedTriangleId: Number,
    Clearance: Number,
    IsFlexible: Boolean
});

var Sources = mongoose.model('Sources', sourceSchema);

module.exports = Sources;
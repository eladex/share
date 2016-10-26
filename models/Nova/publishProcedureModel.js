var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var publishProcedureSchema = new Schema({
    Id: Number,
    Name: String,
    Type: String,
    IsActive: Boolean
});

var PublishProcedure = mongoose.model('PublishProcedure', publishProcedureSchema);

module.exports = PublishProcedure;
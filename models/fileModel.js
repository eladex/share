var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var fileSchema = new Schema({
    name: String,
    uploadDate: {type: Date, default: Date.now},
    modifyDate: {type:Date},
    tags: [],
    type: String,
    size: Number,
    owner: String
});

var Files = mongoose.model('Files', fileSchema);

module.exports = Files;
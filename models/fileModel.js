var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var fileSchema = new Schema({
    name: String,
    uploadDate: {type: Date, default: Date.now},
    modifyDate: {type:Date},
    tags: [],
    type: String,
    size: Number,
    owner: String,
    path: String
});

var Files = mongoose.model('Files', fileSchema);

Files.prototype.normalize = function(){
    return {
        name: this.name,
        size: this.size,
        uploadDate: this.uploadDate,
        modifyDate: this.modifyDate,
        tags: this.tags,
        type: this.type,
        owner: this.owner
    };
};

module.exports = Files;
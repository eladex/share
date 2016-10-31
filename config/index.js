var configValues = require('./config');

module.exports = {
    getDbConnectionString: function(){
        return `mongodb://${configValues.username}:${configValues.password}@ds029426.mlab.com:29426/share`;
    },
    elasticSearch :{
        host:"localhost:9200",
        indexAliasName: "share",
        typeName: "files"
    },
    storageLocation: "C:/files"
    
}

// "/home/eladex/Desktop/tmp"
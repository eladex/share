var configValues = require('./config');

module.exports = {
    getDbConnectionString = function(){
        return `mongodb://${configValues.username}:${configValues.password}@ds029426.mlab.com:29426/share`;
    }
}
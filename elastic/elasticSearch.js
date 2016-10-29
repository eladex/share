var es = require('elasticsearch');
var config = require('../config');

var elasticClient = new es.Client({  //todo: take from config and multi-hosts
    host: config.elasticSearch.host,
    log: 'info'
});

var indexAliasName = config.elasticSearch.indexAliasName;
var typeName = config.elasticSearch.typeName;




function query(queryString, fields) {
    console.log("query string:   " +queryString)
    return elasticClient.search({
        index: indexAliasName,
        type: typeName,
        body: {
            fields:['file.content_type','file.content_length','file.content'],
            query: {
                multi_match: {
                    query: queryString,
                    fields: fields,
                    operator: 'or'
                }
            },
        }
    });
}
function indexDoc(doc){
    return elasticClient.index({
        index: indexAliasName,
        type: typeName,
        body : doc
    })
}
function deleteIndex() {  
    return elasticClient.indices.delete({
        index: indexAliasName
    });
}
function indexExists() {  
    return elasticClient.indices.exists({
        index: indexAliasName
    });
};

module.exports = {
    indexExists: indexExists,
    deleteIndex: deleteIndex,
    indexDoc: indexDoc,
    query: query
};




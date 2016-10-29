var es = require('elasticsearch');
var config = require('../config');

var elasticClient = new es.Client({  //todo: take from config and multi-hosts
    host: config.elasticSearch.host,
    log: 'info'
});

var indexAliasName = config.elasticSearch.indexAliasName;
var indexName = "share-demo";
var typeName = config.elasticSearch.typeName;


function initIndex(){
    console.log("createeeeee");
    return elasticClient.indices.create({
        index: indexName,
        body:{
            settings: {
                analysis: {
                filter: {
                    my_filter: {
                        type: 'ngram',
                        min_gram: 3,
                        max_gram: 20
                    }
                },
                analyzer: {
                    my_analyzer: {
                        type: 'custom',
                        tokenizer: 'standard',
                        filter: ['lowercase', 'my_filter']
                    }
                }
                }
            },
            // mappings: {
            //     docs: {
            //         properties: {
            //             'title': { 
            //             'type': "string",
            //             'analyzer' : "my_analyzer",
            //             'search_analyzer': "standard"
            //             },
            //             'tags': { 
            //             'type': "string",
            //             'analyzer' : "my_analyzer",
            //             'search_analyzer': "standard"
            //             }
            //         }
            //     }
            // }
        }
        
    });
}

function initMapping() {
    console.log("mapssssssssssssssssssss");  
    return elasticClient.indices.putMapping({
        index: indexName,
        type: typeName,
        body: {
            properties: {
                title: { 
                    type: 'string',
                    analyzer: 'my_analyzer',
                    search_analyzer: 'standard'
                },
                tags: { 
                    type: 'string',
                    analyzer: 'my_analyzer',
                    search_analyzer: 'standard'
                },
                file : {
                    type: 'attachment',
                    fields: {
                        content_type: {type: 'string', store:true},
                        content: {type: 'string', store:true},
                        content_length: {type: 'string', store:true},
                    }
                }
                
            }
        }
    });
}

function putAlias() {
    console.log("putalias");
    return elasticClient.indices.putAlias(
        {
            index:indexName, name: indexAliasName
        });
}

// initIndex()
//     .then(function(){return initMapping();})
//     .then(function(){return putAlias();},function(err){console.log(err);});


exports.init = function () {
    return initIndex()
    .then(function(){return initMapping();})
    .then(function(){return putAlias();},function(err){console.log(err);});
}
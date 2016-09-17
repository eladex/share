var es = require('elasticsearch');

var elasticClient = new es.Client({  //todo: take from config and multi-hosts
    host: 'localhost:9200',
    log: 'info'
});

function deleteIndex(indexName) {  
    return elasticClient.indices.delete({
        index: indexName
    });
}
function initIndex(indexName){
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

function initMapping(indexName, type) {
    console.log(indexName + "    "+ type);  
    return elasticClient.indices.putMapping({
        index: indexName,
        type: type,
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
                
            }
        }
    });
}

function query(index, type, queryString, fields) {
    console.log("query string:   " +queryString)
    return elasticClient.search({
        index: index,
        type: type,
        body: {
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

// function initAnalyzers(indexName){
//     return elasticClient.indices.putSettings({
//         index: indexName,
//         analysis: {
//             "filter": {
//                 "trigrams_filter": {
//                     "type":     "ngram",
//                     "min_gram": 3,
//                     "max_gram": 3
//                 }
//             },
//             "analyzer": {
//                     "trigrams": {
//                         "type":      "custom",
//                         "tokenizer": "standard",
//                         "filter":   [
//                             "lowercase",
//                             "trigrams_filter"
//                         ]
//                     }
//                 }
//         }
    
//     });
// }

function indexExists(indexName) {  
    return elasticClient.indices.exists({
        index: indexName
    });
}

function indexDoc(indexName, type, doc){
    return elasticClient.index({
        index: indexName,
        type: type,
        body : doc
    })
}

exports.initIndex = initIndex;
// exports.initAnalyzers = initAnalyzers;
exports.deleteIndex = deleteIndex;
exports.indexExists = indexExists;
exports.initMapping = initMapping;
exports.indexDoc = indexDoc;
exports.query = query;
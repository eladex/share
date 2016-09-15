var es = require('./elasticsearch.js');

es.deleteIndex('share').then(es.initIndex('share')).then(es.initMapping('share','docs'))
.then(function(res){console.log(res)}, function(err){console.log(err)});

// es.indexExists('share').then(function(exists){
//     if(!exists){
//         return es.initIndex('share');
//     }
// }).then(es.initMapping('share','docs'))
// .then(function(res){console.log(res)}, function(err){console.log(err)});
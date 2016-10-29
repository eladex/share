var es = require('./elasticSearch.js');
var stream64 = require('./stream64try.js');
var esInit = require('./esInit.js');

//old code
/*
es.initIndex('share').then(warp(es.initMapping,['share','docs']))
.then(warp(es.indexDoc,['share','docs',{title:'four word',tags:['five ground','nine water']}]))
//.then(warp(es.query,['share','docs','four',['title','tags']])) --- doesn't work- doc isn't searchable yet
.then(function(res){console.log(res)}, function(err){console.log(err)})
.then(setTimeout(function() {
  es.query('share','docs','ine',['title','tags']).then(function(res){console.log(res.hits.hits)}, function(err){console.log(err)});
}, 2000));
*/

// es.deleteIndex('share').then(warp(es.initIndex,['share'])).then(warp(es.initMapping,['share','docs']))
// .then(warp(es.indexDoc,['share','docs',{title:'four word',tags:['five ground','nine water']}]))
// //.then(warp(es.query,['share','docs','four',['title','tags']])) --- doesn't work- doc isn't searchable yet
// .then(function(res){console.log(res)}, function(err){console.log(err)})
// .then(setTimeout(function() {
//   es.query('share','docs','ine',['title','tags'])
//   .then(function(res){console.log(res.hits.hits)}, function(err){console.log(err)});
// }, 2000));

var queryString = "msword"

function warp(f,params) {
  return function(){
    return f.apply(this, params);
  }
}


es.indexExists().then(function(exists){ //delete and re-create the index
    if(exists){ 
        return es.deleteIndex();
    }
}).then(warp(esInit.init,[]))
.then(warp(stream64.get64baseFile,['doc.doc']))
.then(function (data_base64) {
  return es.indexDoc({title:'doc',tags:['five ground','nine water'], 
    file:data_base64}); //add document
})
.then(function(res){console.log(res)}, function(err){console.log(err)})
.then(setTimeout(function() { //perform search
  es.query(queryString,['title','tags','file.content_type','file.content'])
  .then(function(res){console.log(/*JSON.stringify(res))*/ res.hits.hits[0])}, function(err){console.log(err)});
}, 5000));








// es.indexExists('share-demo').then(function(exists){ //delete and re-create the index
//     if(exists){ 
//         return es.deleteIndex('share-demo');
//     }
// }).then(warp(esInit.init,[]),function(err){console.log(err)});

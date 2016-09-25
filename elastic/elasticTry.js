var es = require('./elasticsearch.js');
var stream64 = require('./stream64try.js')

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

var queryString = 'secret'

function warp(f,params) {
  return function(){
    return f.apply(this, params);
  }
}


es.indexExists('share').then(function(exists){ //delete and re-create the index
    if(exists){ 
        return es.deleteIndex('share');
    }
}).then(warp(es.initIndex,['share']))
.then(warp(es.initMapping, ['share', 'docs'])) // put mappings
.then(warp(stream64.get64baseFile,['doc.doc'])) // read msword file and convert to base64
// .then(warp(es.indexDoc,['share','docs',{title:'four word',tags:['five ground','nine water']}])) //add document
.then(function (data_base64) {
  return es.indexDoc('share','docs',{title:'four word',tags:['five ground','nine water'], 
    file:data_base64}); //add document
})
.then(function(res){console.log(res)}, function(err){console.log(err)})
.then(setTimeout(function() { //perform search
  es.query('share','docs',queryString,['title','tags','file.content_type','file.content'])
  .then(function(res){console.log(res.hits.hits[0])}, function(err){console.log(err)});
}, 3000));
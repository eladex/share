var base64 = require('base64-stream');
var fs = require('fs');




function get64baseFile(fileName) {
  var p = new Promise(function (resolve, reject) {
    var enc64= base64.encode();
    var fileStream = fs.createReadStream(fileName);

    fileStream.on('error',function (err) {
      // console.log('fileStream: '+ err);
      reject(err);
    })
    fileStream.on('open',function (err) {
      fileStream.pipe(enc64);
    });

    var data ='';
    enc64.on('data', function (chunk) {
      data+= chunk;
    });
    enc64.on('end', function () {
      console.log('end');
      resolve(data.toString());
      //console.log(data);
    });
    
  });

  return p;
}

exports.get64baseFile = get64baseFile;

// get64baseFile('doc.doc').then(function (res) {
//   console.log(res);
// }, function (err) { console.log(err);});
var packageJson = require('./package.json')
var program = require('commander');
var express = require('express');  
var vdm = require('./lib/vdm');


var app = express();

app.route('/api/posts')
    .get(vdm.postsList);

app.route('/api/posts/:id')
    .get(vdm.post);
    
    
var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('iViedemerde API listening at http://%s:%s', host, port);
});

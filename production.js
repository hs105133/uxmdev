var deployd = require('deployd'),
    gzippo = require('gzippo'),
    express = require('express');

var app = express();
//app.listen(process.env.PORT || 5000);
//var expressServer = http.createServer(app);
//var app = express.createServer(require('morgan')('dev'));

app.use(gzippo.staticGzip(__dirname + '/public'));
//app.listen(process.env.PORT || 5000);

var server = deployd({
  port: process.env.PORT || 5000,
  env: 'development',
  // env: 'production',
  db: {
    host: 'localhost',
    port: 27017, 
    name: 'test'
  }
});

//console.log(server);

server.listen();

server.on('listening', function() {
  console.log("Server is listening on " + process.env.PORT || 5000);
});

server.on('error', function(err) {
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});



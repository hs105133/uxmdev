var deployd = require('deployd'),
    compression = require('compression'),
    express     = require('express');

var app = express();

app.use(compression());
app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 3000);

var server = deployd({
  port: process.env.PORT || 5000,
  env: 'development',
  db: {
    host: 'localhost',
    port: 27017, 
    name: 'test'
  }
});

server.listen();

server.on('listening', function() {
  console.log("Server is listening on " + process.env.PORT || 5000);
});

server.on('error', function(err) {
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});



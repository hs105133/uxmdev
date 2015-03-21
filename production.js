var deployd = require('deployd');

var server = deployd({
  port: process.env.PORT || 5000,
  env: 'development',
  // db: {
  //   host: 'ds033217.mongolab.com',
  //   port: 33217,
  //   name: 'techm',
  //   credentials: {
  //     username: 'hs105133',
  //     password: '12345'
  //   }
  // }
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


